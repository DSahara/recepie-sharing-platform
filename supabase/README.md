# Supabase migrations

Run these in your Supabase project in one of two ways:

## Option 1: Supabase Dashboard (SQL Editor)

1. Open your project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Go to **SQL Editor**.
3. Run the migrations in order:
   - Copy and run `migrations/20250218000001_create_profiles.sql`.
   - Then copy and run `migrations/20250218000002_create_recipes.sql`.

## Option 2: Supabase CLI

If you use the Supabase CLI and link the project:

```bash
supabase db push
```

---

## Tables created

### `public.profiles`

| Column     | Type | Description |
|-----------|------|-------------|
| id        | uuid | PK, matches `auth.users.id` |
| username  | text | Display username |
| fullname  | text | Full name |

- A row is created automatically when a user signs up (trigger on `auth.users`).
- RLS: users can only select/update/insert their own profile.

### `public.recipes`

| Column       | Type        | Description |
|-------------|-------------|-------------|
| id          | uuid        | PK, auto-generated |
| created_at  | timestamptz | Set on insert |
| user_id     | uuid        | Author, references `auth.users` |
| title       | text        | Recipe title |
| ingredients | text        | Ingredients list (e.g. newline-separated) |
| instructions| text        | Step-by-step instructions |
| cooking_time| integer     | Minutes |
| difficulty  | text        | e.g. easy, medium, hard |
| category    | text        | e.g. appetizers, main courses, desserts |

- RLS: anyone can read; only the owner can insert/update/delete.
