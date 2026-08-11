-- =================================================================
-- PHASE 2 SCHEMA — run this in Supabase's SQL Editor (browser-based,
-- no CLI needed: Supabase dashboard -> SQL Editor -> paste -> Run)
-- =================================================================

-- One row per paying customer, extending Supabase's built-in auth.users.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  stripe_customer_id text,
  subscription_status text not null default 'trialing', -- trialing | active | canceled | past_due
  created_at timestamptz not null default now()
);

-- Short-lived codes shown after signup, e.g. "/start ABC123" links Telegram.
create table if not exists linking_codes (
  code text primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  used_at timestamptz
);

-- The actual established link, once a code has been consumed.
create table if not exists telegram_links (
  telegram_user_id bigint primary key,
  user_id uuid not null unique references profiles(id) on delete cascade,
  linked_at timestamptz not null default now()
);

-- Logged expenses.
create table if not exists expenses (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  amount numeric(10,2) not null,
  description text not null,
  category text not null default 'General',
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------
-- ROW LEVEL SECURITY
-- Our backend uses Supabase's SERVICE ROLE key, which bypasses RLS
-- entirely — so this isn't strictly required for the backend to
-- work. Enabling it now anyway, as a safety net for later (e.g. if
-- a browser-based dashboard ever queries Supabase directly with a
-- public key, these policies keep each user's data private).
-- -----------------------------------------------------------------
alter table profiles enable row level security;
alter table linking_codes enable row level security;
alter table telegram_links enable row level security;
alter table expenses enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can view their own expenses"
  on expenses for select
  using (auth.uid() = user_id);

-- No insert/update/delete policies for regular users yet — all
-- writes go through the backend (service role), which bypasses RLS.
-- If a client-side dashboard needs to write directly later, add
-- matching insert/update policies at that point.
