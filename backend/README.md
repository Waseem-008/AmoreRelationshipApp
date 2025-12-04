# Amora Backend

Supabase backend for Amora MVP.

## Structure

```
supabase/
├── migrations/       # SQL schema definitions
│   ├── 20240101000000_initial_schema.sql
│   └── 20240101000001_add_pairing_code.sql
└── functions/        # Deno Edge Functions
    ├── pair_users/
    ├── start_session/
    ├── process_memory/
    └── cron_weekly/
```

## Setup

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Initialize (if not done):
   ```bash
   supabase init
   ```

3. Link to your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Push migrations:
   ```bash
   supabase db push
   ```

5. Deploy functions:
   ```bash
   supabase functions deploy pair_users
   supabase functions deploy start_session
   supabase functions deploy process_memory
   supabase functions deploy cron_weekly
   ```

6. Set secrets:
   ```bash
   supabase secrets set OPENAI_API_KEY=sk-...
   ```

## Edge Functions

### pair_users
Pairs two users using a 6-digit code.

**Request**:
```json
{
  "code": "123456"
}
```

**Response**:
```json
{
  "couple": {
    "id": "uuid",
    "partner_a_id": "uuid",
    "partner_b_id": "uuid"
  }
}
```

### start_session
Starts a daily session and returns OpenAI Realtime session.

**Response**:
```json
{
  "session_id": "uuid",
  "openai_session": {
    "client_secret": "...",
    ...
  }
}
```

### process_memory
Processes session transcript and extracts memories.

**Request**:
```json
{
  "session_id": "uuid",
  "transcript": "text...",
  "summary": "text..."
}
```

### cron_weekly
Scheduled function to assign weekly exercises (runs Fridays).

## Database Schema

See migration files for complete schema.

### Key Tables

- **users**: User profiles, intake data, pairing codes
- **couples**: Paired users, weekly exercises, streaks
- **sessions**: Session logs with transcripts
- **memory_entries**: Personal and shared memories (with embeddings)
- **exercise_reflections**: Weekly reflection submissions

### RLS Policies

All tables have Row Level Security enabled:
- Users can only view/edit their own data
- Partners can view shared themes (not personal memories)
- Admin operations use service role key

## Testing

Test functions locally:

```bash
supabase functions serve
```

Then call with:
```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/pair_users' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"code":"123456"}'
```

## Monitoring

View logs:
```bash
supabase functions logs pair_users
```

## Cron Setup

To schedule `cron_weekly` to run every Friday:

1. Go to Supabase Dashboard → Database → Extensions
2. Enable `pg_cron`
3. Run SQL:
   ```sql
   SELECT cron.schedule(
     'weekly-exercise-assignment',
     '0 12 * * 5',  -- Fridays at noon UTC
     $$
     SELECT net.http_post(
       'https://your-project.supabase.co/functions/v1/cron_weekly',
       '{}',
       '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'
     );
     $$
   );
   ```
