"use client";

import Link from "next/link";
import { useEffect } from "react";
import PageContainer from "@/app/components/PageContainer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full flex-1 bg-background text-foreground">
      <PageContainer size="narrow" className="py-10 lg:py-14">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <p className="text-sm font-bold text-accent uppercase tracking-widest mb-3">
            Article error
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            We couldn’t load this blog post.
          </h1>
          <p className="text-sm sm:text-base text-muted mb-6">
            Try again, or go back to the blog list.
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
              href="/#blogs"
              className="px-6 py-3 rounded-xl text-sm font-bold border border-border bg-background hover:bg-accent-soft transition-colors"
            >
              Back to blogs
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

