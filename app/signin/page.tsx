import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata = {
  title: "Sign in | Recipe Share",
  description: "Sign in to your Recipe Share account.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-stone-900">Sign in</h1>
          <p className="mt-1 text-sm text-stone-500">
            Enter your email and password to continue.
          </p>
          <div className="mt-6">
            <SignInForm />
          </div>
        </div>
      </main>
    </div>
  );
}
