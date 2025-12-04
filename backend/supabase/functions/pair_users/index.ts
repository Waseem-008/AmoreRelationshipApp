import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    const { code } = await req.json()

    // 1. Get the current user (User B)
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    // 2. Find User A by pairing code
    // Note: We need a way to store/lookup codes. 
    // For MVP, let's assume we added a 'pairing_code' column to users table or a separate table.
    // Let's assume we query the 'users' table for 'pairing_code'.
    // We need to use the SERVICE_ROLE key to query other users if RLS prevents it, 
    // OR we have a specific RLS policy for finding by code.
    // Ideally, we use a Service Role client for admin-like tasks like pairing.
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: partnerA, error: findError } = await supabaseAdmin
      .from('users')
      .select('id, couple_id')
      .eq('pairing_code', code)
      .single()

    if (findError || !partnerA) {
      return new Response(JSON.stringify({ error: 'Invalid pairing code' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    if (partnerA.couple_id) {
       return new Response(JSON.stringify({ error: 'Partner is already paired' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }
    
    if (partnerA.id === user.id) {
        return new Response(JSON.stringify({ error: 'Cannot pair with yourself' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // 3. Create Couple
    const { data: couple, error: coupleError } = await supabaseAdmin
      .from('couples')
      .insert({
        partner_a_id: partnerA.id,
        partner_b_id: user.id,
      })
      .select()
      .single()

    if (coupleError) throw coupleError

    // 4. Update both users with couple_id
    const { error: updateErrorA } = await supabaseAdmin
      .from('users')
      .update({ couple_id: couple.id, pairing_code: null }) // Clear code after use
      .eq('id', partnerA.id)

    const { error: updateErrorB } = await supabaseAdmin
      .from('users')
      .update({ couple_id: couple.id })
      .eq('id', user.id)

    if (updateErrorA || updateErrorB) throw new Error('Failed to update users')

    return new Response(JSON.stringify({ couple }), {
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
