"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;
    const fullName = (formData.get("full_name") as string)?.trim() || undefined;
    const username = (formData.get("username") as string)?.trim() || undefined;

    if (!email || !password) {
      setError("Please enter email and password.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: username ?? email.split("@")[0],
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setMessage("Check your email to confirm your account, then sign in.");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}
      {message && (
        <div
          role="status"
          className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          {message}
        </div>
      )}
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-stone-700">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          placeholder="At least 6 characters"
        />
      </div>
      <div>
        <label htmlFor="signup-fullname" className="block text-sm font-medium text-stone-700">
          Full name <span className="text-stone-400">(optional)</span>
        </label>
        <input
          id="signup-fullname"
          name="full_name"
          type="text"
          autoComplete="name"
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label htmlFor="signup-username" className="block text-sm font-medium text-stone-700">
          Username <span className="text-stone-400">(optional)</span>
        </label>
        <input
          id="signup-username"
          name="username"
          type="text"
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          placeholder="janedoe"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-50"
      >
        {loading ? "Creating account…" : "Sign up"}
      </button>
      <p className="text-center text-sm text-stone-500">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-stone-900 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
