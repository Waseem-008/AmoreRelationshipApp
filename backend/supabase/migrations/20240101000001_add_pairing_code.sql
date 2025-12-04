-- Add pairing_code to users table
alter table public.users add column pairing_code text unique;

-- Index for faster lookup
create index idx_users_pairing_code on public.users(pairing_code);
