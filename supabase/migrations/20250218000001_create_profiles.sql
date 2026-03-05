-- Profiles table: extends auth.users with username and fullname
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  username text,
  fullname text,
  primary key (id)
);

comment on table public.profiles is 'User profile data; id matches auth.users.id';

-- RLS: users can read and update only their own profile
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Trigger: create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, fullname)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', trim(split_part(new.email, '@', 1))),
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
