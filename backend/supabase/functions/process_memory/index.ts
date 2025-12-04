import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { OpenAI } from 'https://esm.sh/openai@4.28.0'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        const { session_id, transcript, summary } = await req.json()

        // 1. Authenticate
        const {
            data: { user },
        } = await supabaseClient.auth.getUser()

        if (!user) throw new Error('Not authenticated')

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const openai = new OpenAI({
            apiKey: Deno.env.get('OPENAI_API_KEY'),
        })

        // 2. Update Session Record
        const { error: updateError } = await supabaseAdmin
            .from('sessions')
            .update({
                transcript,
                summary,
                ended_at: new Date().toISOString(),
                duration_seconds: 900 // Placeholder or calculate from start/end
            })
            .eq('id', session_id)
            .eq('user_id', user.id)

        if (updateError) throw updateError

        // 3. Extract Memories using LLM
        const extractionPrompt = `
    Analyze the following relationship therapy session transcript and extract key memory entries.
    Output a JSON array of objects with the following structure:
    {
        "type": "issue" | "goal" | "theme" | "pattern" | "reflection" | "commitment",
        "content": {
            "title": "Short title",
            "summary": "Concise summary of the point",
            "keywords": ["tag1", "tag2"],
            "sentiment": "positive" | "negative" | "mixed",
            "intensity": 0.0 to 1.0
        },
        "scope": "personal" | "shared" 
    }
    
    Rules:
    - "shared" items are high-level themes/patterns safe for the partner to see.
    - "personal" items are private thoughts/feelings.
    - Be conservative with "shared".
    
    Transcript:
    ${transcript}
    `

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "system", content: "You are an expert relationship analyst." }, { role: "user", content: extractionPrompt }],
            response_format: { type: "json_object" }
        })

        const result = JSON.parse(completion.choices[0].message.content)
        const entries = result.entries || result.memories || [] // Handle potential JSON structure variations

        // 4. Generate Embeddings & Store
        const { data: userData } = await supabaseAdmin.from('users').select('couple_id').eq('id', user.id).single()

        for (const entry of entries) {
            // Generate embedding for the summary/content
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: `${entry.content.title}: ${entry.content.summary}`,
                encoding_format: "float",
            });
            const embedding = embeddingResponse.data[0].embedding;

            await supabaseAdmin.from('memory_entries').insert({
                user_id: user.id,
                couple_id: entry.scope === 'shared' ? userData?.couple_id : null, // Only link couple_id if shared? Or always link but use type? Spec says "Shared couple memory (themes only)". RLS handles visibility.
                // If I link couple_id, the partner can see it IF it matches the RLS policy.
                // RLS: "Partners can view shared themes" -> couple_id is not null AND type='theme' (or we just use couple_id presence).
                // My RLS policy: "couple_id is not null".
                // So if I want it private, couple_id MUST be null.
                // If I want it shared, couple_id MUST be set.
                // So:
                // Personal -> couple_id: null
                // Shared -> couple_id: userData.couple_id
                type: entry.type,
                content: entry.content,
                embedding: embedding
            })
        }

        // 5. Update Daily Completion
        await supabaseAdmin.from('users').update({
            daily_completed_at: new Date().toISOString(),
            // Increment streak logic would go here or in a separate trigger/function
        }).eq('id', user.id)

        return new Response(JSON.stringify({ success: true, entries_count: entries.length }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
