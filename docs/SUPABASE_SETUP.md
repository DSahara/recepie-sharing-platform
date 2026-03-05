# Initial Supabase setup

Follow these steps to connect your Next.js app to Supabase (auth + database).

---

## 1. Install dependencies

From the project root:

```bash
npm install
```

This installs `@supabase/supabase-js` and `@supabase/ssr` (already listed in `package.json`).

---

## 2. Get your Supabase URL and anon key

1. Open [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. Go to **Project Settings** (gear icon) → **API**.
3. Copy:
   - **Project URL** → use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key (under "Project API keys") → use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

You can also use **Connect** → **Next.js** in the dashboard to see the same values.

---

## 3. Create environment file

1. Copy the example file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and set your real values:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Do not commit `.env.local` (it should be in `.gitignore`).

---

## 4. What’s already in the project

| Item | Purpose |
|------|--------|
| **lib/supabase/client.ts** | Browser client for Client Components (`'use client'`). Use `createClient()` from here in hooks, event handlers, etc. |
| **lib/supabase/server.ts** | Server client for Server Components, Server Actions, Route Handlers. Use `await createClient()` (async). |
| **lib/supabase/middleware.ts** | Refreshes the auth session and writes updated cookies to the response. |
| **middleware.ts** (root) | Runs `updateSession` on each request so logged-in users stay logged in. |

---

## 5. How to use the clients

**In a Client Component (e.g. login form, sign out button):**

```tsx
'use client';

import { createClient } from '@/lib/supabase/client';

export function SignOutButton() {
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return <button onClick={handleSignOut}>Sign out</button>;
}
```

**In a Server Component or Server Action:**

```tsx
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <p>Logged in as: {user?.email ?? 'Guest'}</p>;
}
```

**Fetching recipes (server):**

```tsx
const supabase = await createClient();
const { data, error } = await supabase
  .from('recipes')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## 6. Run the app

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). The middleware will refresh the Supabase session on each request when cookies are present.

---

## 7. Database schema reference

Tables used in this project:

- **auth.users** – Supabase Auth (built-in).
- **public.profiles** – `id` (uuid, = auth.users.id), `username`, `fullname`, `avatar_url`.
- **public.recipes** – `id`, `created_at`, `user_id`, `title`, `ingredients`, `instructions`, `cooking_time`, `difficulty`, `category`.

See **supabase/SCHEMA.md** (if present) or your Supabase schema diagram for details.

---

## Troubleshooting

- **“Invalid API key”** – Double-check `.env.local` and that you’re using the **anon** key, not the service_role key.
- **Session not persisting** – Ensure `middleware.ts` is at the project root and its `matcher` includes the routes you use.
- **RLS errors** – In Supabase Dashboard → Authentication → Policies, confirm RLS policies for `profiles` and `recipes` match the behavior you want (e.g. users can update own profile, anyone can read recipes).

Once this is done, you can add login/signup pages and start reading/writing from `profiles` and `recipes`.
