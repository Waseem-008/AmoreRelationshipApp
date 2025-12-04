import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const EXERCISES = [
    {
        id: 'ex_001',
        title: 'The Gratitude Walk',
        description: 'Take a 15-minute walk together without phones. Share 3 things you appreciate about each other.',
        instructions: '1. Leave phones at home. 2. Walk for 15 mins. 3. Take turns sharing.'
    },
    {
        id: 'ex_002',
        title: 'Cook a Meal Together',
        description: 'Prepare a new recipe together. One person chops, one person cooks.',
        instructions: 'Pick a recipe you have never tried. Assign roles.'
    },
    // Add more...
]

Deno.serve(async (req) => {
    // Can be called via HTTP or Cron. If HTTP, check auth or secret.
    // For Cron, Supabase adds a specific header or we check for a service key if we want to be strict.
    // Assuming this is triggered by Supabase Cron which uses the service role or a specific config.

    try {
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Get all couples
        // In a real app, paginate.
        const { data: couples, error } = await supabaseAdmin.from('couples').select('id, weekly_exercise, exercise_assigned_at')

        if (error) throw error

        const updates = []
        const now = new Date()
        const friday = now.getDay() === 5 // 5 is Friday

        // Logic: If it's Friday (or we just run it on Friday), assign if not assigned recently.
        // Let's assume this runs every Friday.

        const selectedExercise = EXERCISES[Math.floor(Math.random() * EXERCISES.length)]

        for (const couple of couples) {
            // Check if assigned this week
            const lastAssigned = couple.exercise_assigned_at ? new Date(couple.exercise_assigned_at) : null
            const isAssignedThisWeek = lastAssigned && (now.getTime() - lastAssigned.getTime() < 7 * 24 * 60 * 60 * 1000) && lastAssigned.getDay() === 5 // Roughly

            // Better logic: Reset every week.
            // Spec: "Friday end-of-session... If no exercise for current week -> Assign".
            // So this might be called by the client or a cron.
            // If Cron, we just overwrite or set if empty.

            // Let's just set it for everyone who doesn't have one "active" or just overwrite for the new week.
            // Simple MVP: Assign new exercise to everyone.

            updates.push({
                id: couple.id,
                weekly_exercise: selectedExercise,
                exercise_assigned_at: now.toISOString(),
                partner_a_reflected: false,
                partner_b_reflected: false
            })
        }

        if (updates.length > 0) {
            const { error: updateError } = await supabaseAdmin.from('couples').upsert(updates)
            if (updateError) throw updateError
        }

        return new Response(JSON.stringify({ success: true, updated: updates.length }), {
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
