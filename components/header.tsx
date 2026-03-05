import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import type { User } from "@supabase/supabase-js";

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-stone-900"
        >
          Recipe Share
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            Browse
          </Link>
          {user ? (
            <>
              <span className="text-sm text-stone-500">
                {user.email}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="text-sm font-medium text-stone-600 hover:text-stone-900"
              >
                Sign up
              </Link>
              <Link
                href="/signin"
                className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
              >
                Sign in
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
