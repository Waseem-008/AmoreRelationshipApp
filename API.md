# Amora MVP - API Reference

Complete API documentation for all backend endpoints.

## Base URL

```
Production: https://your-project.supabase.co/functions/v1
Staging: https://your-staging.supabase.co/functions/v1
Local: http://localhost:54321/functions/v1
```

## Authentication

All endpoints require authentication via JWT token in the Authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Get token from Supabase Auth:
```typescript
const { data: { session } } = await supabase.auth.getSession()
const token = session.access_token
```

---

## Edge Functions

### 1. Pair Users

Pairs two users together using a 6-digit pairing code.

**Endpoint**: `POST /pair_users`

**Request Body**:
```json
{
  "code": "123456"
}
```

**Response** (200 OK):
```json
{
  "couple": {
    "id": "uuid",
    "partner_a_id": "uuid",
    "partner_b_id": "uuid",
    "paired_at": "2024-01-01T00:00:00Z",
    "shared_streak_weeks": 0
  }
}
```

**Error Responses**:

*400 Bad Request*:
```json
{
  "error": "Invalid pairing code"
}
```

*400 Bad Request*:
```json
{
  "error": "Partner is already paired"
}
```

*400 Bad Request*:
```json
{
  "error": "Cannot pair with yourself"
}
```

**Example Usage**:

```typescript
const { data, error } = await supabase.functions.invoke('pair_users', {
  body: { code: '123456' }
})
```

```bash
curl -X POST https://your-project.supabase.co/functions/v1/pair_users \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"code":"123456"}'
```

---

### 2. Start Session

Initializes a daily AI session, fetches memory context, and creates OpenAI Realtime session.

**Endpoint**: `POST /start_session`

**Request Body**: None

**Response** (200 OK):
```json
{
  "session_id": "uuid",
  "openai_session": {
    "id": "sess_xxx",
    "object": "realtime.session",
    "model": "gpt-4o-realtime-preview-2024-10-01",
    "expires_at": 1234567890,
    "client_secret": {
      "value": "secret_xxx",
      "expires_at": 1234567890
    }
  }
}
```

**Error Responses**:

*400 Bad Request*:
```json
{
  "error": "Session already completed today"
}
```

*500 Internal Server Error*:
```json
{
  "error": "OpenAI Error: <details>"
}
```

**Example Usage**:

```typescript
const { data, error } = await supabase.functions.invoke('start_session')

if (!error) {
  const { session_id, openai_session } = data
  const clientSecret = openai_session.client_secret.value
  
  // Use clientSecret to connect to WebSocket
}
```

**WebSocket Connection**:

After getting client_secret, connect to OpenAI Realtime:

```typescript
const ws = new WebSocket(
  'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01'
)

// Send authorization on connection
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'session.update',
    session: {
      modalities: ['text', 'audio'],
      instructions: 'Your system instructions here'
    }
  }))
}
```

---

### 3. Process Memory

Processes session results, extracts memories, generates embeddings, and stores them.

**Endpoint**: `POST /process_memory`

**Request Body**:
```json
{
  "session_id": "uuid",
  "transcript": "Full session transcript text...",
  "summary": "Brief session summary"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "entries_count": 5
}
```

**Error Responses**:

*400 Bad Request*:
```json
{
  "error": "Invalid session_id"
}
```

**Memory Entry Structure**:

The function extracts memories in this format:

```json
{
  "type": "issue" | "goal" | "theme" | "pattern" | "reflection" | "commitment",
  "content": {
    "title": "Short title",
    "summary": "Detailed summary without quotes",
    "keywords": ["tag1", "tag2", "tag3"],
    "sentiment": "positive" | "negative" | "mixed",
    "intensity": 0.0 to 1.0
  },
  "scope": "personal" | "shared"
}
```

**Example Usage**:

```typescript
const { data, error } = await supabase.functions.invoke('process_memory', {
  body: {
    session_id: 'uuid-here',
    transcript: 'User: I felt really connected today...',
    summary: 'User discussed feeling more connected after quality time'
  }
})
```

---

### 4. Cron Weekly

**Endpoint**: `POST /cron_weekly` (Internal use only)

This function is triggered by Supabase cron scheduler every Friday to assign weekly exercises.

**Request Body**: None (empty object)

**Response** (200 OK):
```json
{
  "success": true,
  "updated": 15
}
```

**Cron Schedule**:

Set up in Supabase Dashboard → SQL Editor:

```sql
SELECT cron.schedule(
  'weekly-exercise-assignment',
  '0 12 * * 5',  -- Fridays at noon UTC
  $$
  SELECT net.http_post(
    'https://your-project.supabase.co/functions/v1/cron_weekly',
    '{}',
    headers:=jsonb_build_object(
      'Authorization', 
      'Bearer YOUR_SERVICE_ROLE_KEY'
    )
  );
  $$
);
```

**Exercise Format**:

```json
{
  "id": "ex_001",
  "title": "The Gratitude Walk",
  "description": "Take a 15-minute walk together without phones. Share 3 things you appreciate about each other.",
  "instructions": "1. Leave phones at home. 2. Walk for 15 mins. 3. Take turns sharing."
}
```

---

## Database API (Supabase Client)

### Authentication

#### Sign Up

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SecurePassword123!'
})
```

#### Sign In

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'SecurePassword123!'
})
```

#### Sign Out

```typescript
const { error } = await supabase.auth.signOut()
```

#### Get Current User

```typescript
const { data: { user } } = await supabase.auth.getUser()
```

---

### User Profile Operations

#### Get User Profile

```typescript
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single()
```

#### Update Intake Data

```typescript
const { error } = await supabase
  .from('users')
  .update({
    intake_data: { /* intake form data */ },
    intake_completed: true
  })
  .eq('id', userId)
```

#### Generate Pairing Code

```typescript
const code = Math.floor(100000 + Math.random() * 900000).toString()

const { error } = await supabase
  .from('users')
  .update({ pairing_code: code })
  .eq('id', userId)
```

---

### Couple Operations

#### Get Couple Data

```typescript
const { data, error } = await supabase
  .from('couples')
  .select('*')
  .eq('id', coupleId)
  .single()
```

#### Submit Reflection

```typescript
const { error } = await supabase
  .from('exercise_reflections')
  .insert({
    user_id: userId,
    couple_id: coupleId,
    reflection_text: 'My reflection text...'
  })
```

---

### Session Operations

#### Get Recent Sessions

```typescript
const { data, error } = await supabase
  .from('sessions')
  .select('*')
  .eq('user_id', userId)
  .order('started_at', { ascending: false })
  .limit(10)
```

---

### Memory Operations

#### Get Personal Memories

```typescript
const { data, error } = await supabase
  .from('memory_entries')
  .select('*')
  .eq('user_id', userId)
  .is('couple_id', null)
  .order('created_at', { ascending: false })
  .limit(20)
```

#### Search Memories by Embedding (Semantic Search)

```typescript
const { data, error } = await supabase.rpc('match_memories', {
  query_embedding: embedding, // 1536-dimension vector
  match_threshold: 0.7,
  match_count: 5
})
```

Note: You'll need to create this RPC function in your database.

---

## Rate Limits

| Endpoint | Rate Limit | Notes |
|----------|-----------|-------|
| start_session | 1 request/day per user | Enforced server-side |
| process_memory | 2 requests/day per user | Allows retry |
| pair_users | 10 requests/hour per user | Prevent abuse |
| Database queries | 1000 requests/hour | Supabase limit |

---

## Error Codes

| Code | Meaning | Common Cause |
|------|---------|--------------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid JWT |
| 403 | Forbidden | RLS policy violation |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |

---

## OpenAI Realtime API

### WebSocket Events

**Client → Server**:

```json
// Send audio chunk
{
  "type": "input_audio_buffer.append",
  "audio": "base64_encoded_audio"
}

// Commit audio buffer
{
  "type": "input_audio_buffer.commit"
}

// Create response
{
  "type": "response.create"
}
```

**Server → Client**:

```json
// Audio delta
{
  "type": "response.audio.delta",
  "delta": "base64_encoded_audio"
}

// Response done
{
  "type": "response.done",
  "response": {
    "id": "resp_xxx",
    "output": [...]
  }
}

// Error
{
  "type": "error",
  "error": {
    "message": "Error description"
  }
}
```

### Audio Format

- **Input**: PCM16, 24kHz, mono
- **Output**: PCM16, 24kHz, mono
- **Encoding**: Base64 for transmission

---

## Testing

### Using cURL

```bash
# Start session
curl -X POST https://your-project.supabase.co/functions/v1/start_session \
  -H "Authorization: Bearer $JWT_TOKEN"

# Pair users
curl -X POST https://your-project.supabase.co/functions/v1/pair_users \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code":"123456"}'

# Process memory
curl -X POST https://your-project.supabase.co/functions/v1/process_memory \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id":"uuid",
    "transcript":"text",
    "summary":"summary"
  }'
```

### Using Postman

1. Import Supabase environment
2. Set `base_url` variable
3. Set `jwt_token` in Authorization header
4. Make requests to endpoints

---

## SDK Examples

### TypeScript (Admin Panel)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
)

// Start session
const startSession = async () => {
  const { data, error } = await supabase.functions.invoke('start_session')
  return data
}
```

### Swift (iOS)

```swift
import Supabase

let supabase = SupabaseClient(
  supabaseURL: URL(string: "https://your-project.supabase.co")!,
  supabaseKey: "your-anon-key"
)

// Start session
func startSession() async throws -> SessionResponse {
  let response = try await supabase.functions.invoke("start_session")
  return try JSONDecoder().decode(SessionResponse.self, from: response.data)
}
```

---

For more examples, see:
- `backend/README.md`
- `admin-web/src/lib/supabase.ts`
- `ios/Amora/Amora/Services/DataService.swift`
