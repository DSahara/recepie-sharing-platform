import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = {
  title: "Sign up | Recipe Share",
  description: "Create your Recipe Share account.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-stone-900">Sign up</h1>
          <p className="mt-1 text-sm text-stone-500">
            Create an account to share and save recipes.
          </p>
          <div className="mt-6">
            <SignUpForm />
          </div>
        </div>
      </main>
    </div>
  );
}
