-- Amora MVP - Sample Seed Data
-- This script creates test users and couples for development/testing

-- NOTE: Run this ONLY in development/staging environments
-- This will create test accounts with known passwords

-- Test Users
-- Email: alice@test.com, Password: TestPass123!
-- Email: bob@test.com, Password: TestPass123!

-- Create test user 1 (Alice)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'alice@test.com',
  crypt('TestPass123!', gen_salt('bf')),
  now(),
  now(),
  now()
);

INSERT INTO public.users (
  id,
  email,
  intake_completed,
  intake_data,
  streak_count,
  timezone
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'alice@test.com',
  true,
  '{
    "relationship_length": "1-3 years",
    "living_together": true,
    "challenges": ["Communication", "Quality time"],
    "goals": "We want to improve our communication and feel more connected",
    "conflict_style": "discuss",
    "deep_conversation_frequency": "weekly",
    "positive_memory": "Our recent picnic in the park was wonderful",
    "connection_definition": "Feeling understood and supported",
    "emotional_support": 7,
    "quality_time_hours": "10-20"
  }',
  5,
  'UTC'
);

-- Create test user 2 (Bob)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'bob@test.com',
  crypt('TestPass123!', gen_salt('bf')),
  now(),
  now(),
  now()
);

INSERT INTO public.users (
  id,
  email,
  intake_completed,
  intake_data,
  streak_count,
  timezone,
  pairing_code
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'bob@test.com',
  true,
  '{
    "relationship_length": "1-3 years",
    "living_together": true,
    "challenges": ["Intimacy", "Work-life balance"],
    "goals": "Better work-life balance and more quality time together",
    "conflict_style": "compromise",
    "deep_conversation_frequency": "weekly",
    "positive_memory": "Cooking dinner together last weekend",
    "connection_definition": "Being present and engaged",
    "emotional_support": 8,
    "quality_time_hours": "10-20"
  }',
  5,
  'UTC',
  '123456'  -- Test pairing code
);

-- Create couple relationship
INSERT INTO public.couples (
  id,
  partner_a_id,
  partner_b_id,
  paired_at,
  shared_streak_weeks,
  weekly_exercise
) VALUES (
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  now() - interval '2 weeks',
  2,
  '{
    "id": "ex_001",
    "title": "The Gratitude Walk",
    "description": "Take a 15-minute walk together without phones. Share 3 things you appreciate about each other.",
    "instructions": "1. Leave phones at home. 2. Walk for 15 mins. 3. Take turns sharing."
  }'
);

-- Update users with couple_id
UPDATE public.users 
SET couple_id = '00000000-0000-0000-0000-000000000010'
WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002'
);

-- Create sample session for Alice
INSERT INTO public.sessions (
  id,
  user_id,
  couple_id,
  started_at,
  ended_at,
  duration_seconds,
  mode,
  summary,
  transcript
) VALUES (
  '00000000-0000-0000-0000-000000000100',
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000010',
  now() - interval '1 day',
  now() - interval '1 day' + interval '12 minutes',
  720,
  'voice',
  'Alice shared about feeling more connected after their picnic. She expressed wanting to have more quality time together.',
  'AI: Hi Alice, how are you feeling today? USER: Pretty good! I''ve been thinking about our picnic last weekend...'
);

-- Create sample memory entries
INSERT INTO public.memory_entries (
  id,
  type,
  user_id,
  content,
  created_at
) VALUES
(
  '00000000-0000-0000-0000-000000000200',
  'goal',
  '00000000-0000-0000-0000-000000000001',
  '{
    "title": "More quality time",
    "summary": "Alice wants to spend more intentional quality time with Bob",
    "keywords": ["quality time", "connection", "intentional"],
    "sentiment": "positive",
    "intensity": 0.7
  }',
  now() - interval '3 days'
),
(
  '00000000-0000-0000-0000-000000000201',
  'theme',
  null,
  '{
    "title": "Communication improvement",
    "summary": "Both partners are working on expressing feelings more openly",
    "keywords": ["communication", "openness", "feelings"],
    "sentiment": "positive",
    "intensity": 0.6
  }',
  now() - interval '2 days'
);

-- Link shared memory to couple
UPDATE public.memory_entries
SET couple_id = '00000000-0000-0000-0000-000000000010'
WHERE id = '00000000-0000-0000-0000-000000000201';

-- Create sample reflection
INSERT INTO public.exercise_reflections (
  id,
  user_id,
  couple_id,
  reflection_text,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000300',
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000010',
  'How it went: The gratitude walk was lovely! We walked around the neighborhood without our phones.

What I learned: I realized how much I miss these simple moments together.

Partner''s response: Bob really opened up and shared things I hadn''t heard before.

Rating: 5/5',
  now() - interval '1 week'
);

-- Create analytics events
INSERT INTO public.analytics_events (
  user_id,
  couple_id,
  event_name,
  metadata,
  timestamp
) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000010',
  'session_completed',
  '{"duration": 720, "mode": "voice"}',
  now() - interval '1 day'
),
(
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000010',
  'pairing_completed',
  '{"method": "code"}',
  now() - interval '2 weeks'
);

-- Success message
SELECT 
  'Seed data created successfully!' as message,
  'Test accounts:' as info,
  'alice@test.com / TestPass123!' as alice,
  'bob@test.com / TestPass123!' as bob,
  'Pairing code: 123456' as pairing_code;
