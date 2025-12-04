-- Enable necessary extensions
create extension if not exists "vector" with schema extensions;
create extension if not exists "pg_net" with schema extensions;

-- 1. USERS Table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  couple_id uuid, -- Foreign key added later to avoid circular dependency issues if created out of order, but here it's fine as self-ref or separate table
  intake_data jsonb default '{}'::jsonb,
  intake_completed boolean default false,
  daily_completed_at timestamptz,
  streak_count integer default 0,
  last_session_at timestamptz,
  timezone text default 'UTC',
  notifications_enabled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. COUPLES Table
create table public.couples (
  id uuid default gen_random_uuid() primary key,
  partner_a_id uuid references public.users(id),
  partner_b_id uuid references public.users(id),
  paired_at timestamptz default now(),
  weekly_exercise jsonb default '{}'::jsonb,
  exercise_assigned_at timestamptz,
  partner_a_reflected boolean default false,
  partner_b_reflected boolean default false,
  shared_streak_weeks integer default 0
);

-- Add foreign key back to users for couple_id
alter table public.users add constraint fk_couple foreign key (couple_id) references public.couples(id);

-- 3. SESSIONS Table
create table public.sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) not null,
  couple_id uuid references public.couples(id),
  started_at timestamptz default now(),
  ended_at timestamptz,
  duration_seconds integer,
  mode text check (mode in ('voice', 'chat', 'mixed')),
  summary text,
  transcript text,
  memory_deltas jsonb,
  fallback_triggered boolean default false,
  reconnect_attempts integer default 0,
  error_occurred boolean default false
);

-- 4. MEMORY ENTRIES Table
create table public.memory_entries (
  id uuid default gen_random_uuid() primary key,
  type text not null, -- 'issue', 'goal', 'theme', 'pattern', 'reflection', 'commitment', 'topic_switch', 'intake_summary'
  user_id uuid references public.users(id),
  couple_id uuid references public.couples(id),
  content jsonb not null, -- title, summary, keywords, sentiment, intensity
  embedding vector(1536), -- OpenAI text-embedding-3-small dimensions
  created_at timestamptz default now()
);

-- 5. EXERCISE REFLECTIONS Table
create table public.exercise_reflections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) not null,
  couple_id uuid references public.couples(id),
  reflection_text text,
  created_at timestamptz default now()
);

-- 6. ANALYTICS EVENTS Table
create table public.analytics_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id),
  couple_id uuid references public.couples(id),
  event_name text not null,
  metadata jsonb,
  timestamp timestamptz default now()
);

-- 7. ADMIN AUDIT LOG Table
create table public.admin_audit_log (
  id uuid default gen_random_uuid() primary key,
  admin_id uuid references auth.users(id),
  action text not null,
  target_id uuid,
  details jsonb,
  timestamp timestamptz default now()
);

-- ROW LEVEL SECURITY (RLS)
alter table public.users enable row level security;
alter table public.couples enable row level security;
alter table public.sessions enable row level security;
alter table public.memory_entries enable row level security;
alter table public.exercise_reflections enable row level security;
alter table public.analytics_events enable row level security;
alter table public.admin_audit_log enable row level security;

-- RLS POLICIES

-- Users: Can view/edit their own profile
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Couples: Can view if they are one of the partners
create policy "Partners can view their couple data" on public.couples
  for select using (auth.uid() = partner_a_id or auth.uid() = partner_b_id);

-- Sessions: Can view own sessions
create policy "Users can view own sessions" on public.sessions
  for select using (auth.uid() = user_id);

-- Memory: 
-- Personal memories: Only owner can view
create policy "Users can view own personal memories" on public.memory_entries
  for select using (auth.uid() = user_id and couple_id is null);

-- Shared memories (Themes): Both partners can view
create policy "Partners can view shared themes" on public.memory_entries
  for select using (
    couple_id is not null and 
    couple_id in (select couple_id from public.users where id = auth.uid())
  );

-- Exercise Reflections:
-- Can view own
create policy "Users can view own reflections" on public.exercise_reflections
  for select using (auth.uid() = user_id);
-- Can view partner's ONLY IF both have reflected (Logic usually handled in app/function, but basic RLS allows reading if in same couple)
-- For MVP simplicity, allowing partners to read each other's reflections if they are in the same couple
create policy "Partners can view couple reflections" on public.exercise_reflections
  for select using (
    couple_id in (select couple_id from public.users where id = auth.uid())
  );

-- INDEXES for Performance
create index idx_users_couple_id on public.users(couple_id);
create index idx_sessions_user_id on public.sessions(user_id);
create index idx_memory_user_id on public.memory_entries(user_id);
create index idx_memory_couple_id on public.memory_entries(couple_id);
create index idx_memory_embedding on public.memory_entries using hnsw (embedding vector_cosine_ops);
