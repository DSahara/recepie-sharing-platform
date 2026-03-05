-- Recipes table: user-uploaded recipes
create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users on delete cascade,
  title text not null,
  ingredients text not null,
  instructions text not null,
  cooking_time integer,
  difficulty text,
  category text
);

comment on table public.recipes is 'Recipe posts; user_id is the author';
comment on column public.recipes.cooking_time is 'Cooking time in minutes';
comment on column public.recipes.difficulty is 'e.g. easy, medium, hard';
comment on column public.recipes.category is 'e.g. appetizers, main courses, desserts';

-- Index for listing recipes by author and by created_at
create index recipes_user_id_idx on public.recipes (user_id);
create index recipes_created_at_idx on public.recipes (created_at desc);
create index recipes_category_idx on public.recipes (category);

-- RLS: anyone can read; only owner can insert/update/delete
alter table public.recipes enable row level security;

create policy "Anyone can view recipes"
  on public.recipes for select
  using (true);

create policy "Users can insert own recipes"
  on public.recipes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own recipes"
  on public.recipes for update
  using (auth.uid() = user_id);

create policy "Users can delete own recipes"
  on public.recipes for delete
  using (auth.uid() = user_id);
