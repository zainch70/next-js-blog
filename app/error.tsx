"use client";

import { useEffect } from "react";
import Link from "next/link";
import PageContainer from "./components/PageContainer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep console noise minimal but available for debugging.
    console.error(error);
  }, [error]);

  return (
    <main className="flex w-full min-h-0 flex-1 flex-col items-stretch overflow-x-hidden bg-background text-foreground">
      <PageContainer className="py-12 lg:py-16">
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-sm">
          <p className="text-sm font-bold text-accent uppercase tracking-widest mb-3">
            Something went wrong
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            We couldn’t load this page.
          </h1>
          <p className="text-sm sm:text-base text-muted mb-6">
            Try again, or go back to the homepage.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-bold cursor-pointer"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl text-sm font-bold border border-border bg-background hover:bg-accent-soft transition-colors"
            >
              Go home
            </Link>
          </div>

          {error?.digest && (
            <p className="text-xs text-muted mt-6">
              Error id: <span className="font-mono">{error.digest}</span>
            </p>
          )}
        </div>
      </PageContainer>
    </main>
  );
}

