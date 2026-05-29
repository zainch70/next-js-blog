"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthInput from "@/app/components/AuthInput";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="flex-1 w-full flex items-center justify-center bg-background p-6 lg:p-10">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
        <p className="text-sm text-muted mb-8">Sign in to manage your blogs</p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
            autoComplete="current-password"
          />
          <button type="submit" className="w-full btn-primary py-2.5 rounded-xl cursor-pointer">
            Log In
          </button>
        </form>

        <p className="text-sm text-muted text-center mt-6">
          New here?{" "}
          <Link href="/signup" className="text-accent font-bold hover:text-accent-hover hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
