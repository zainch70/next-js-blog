"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions";
import Link from "next/link";
import AuthInput from "@/app/components/AuthInput";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await registerUser(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="flex-1 w-full flex items-center justify-center bg-background p-6 lg:p-10">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground mb-1">Create account</h1>
        <p className="text-sm text-muted mb-8">Start writing your blogs today</p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <AuthInput
            id="name"
            name="name"
            type="text"
            label="Name"
            icon="user"
            required
            autoComplete="name"
          />
          <AuthInput
            id="email"
            name="email"
            type="email"
            label="Email"
            icon="email"
            required
            autoComplete="email"
          />
          <AuthInput
            id="password"
            name="password"
            type="password"
            label="Password"
            icon="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <button type="submit" className="w-full btn-primary py-2.5 rounded-xl cursor-pointer">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-muted text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-accent font-bold hover:text-accent-hover hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
