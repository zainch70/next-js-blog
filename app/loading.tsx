import PageContainer from "./components/PageContainer";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-border/60 ${className}`.trim()} />;
}

export default function Loading() {
  return (
    <main className="flex w-full min-h-0 flex-1 flex-col items-stretch overflow-x-hidden bg-background text-foreground">
      <section className="w-full shrink-0 border-b border-border/60 bg-gradient-to-b from-accent-soft/30 to-background">
        <PageContainer className="pt-10 pb-10 lg:pt-14 lg:pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <Skeleton className="h-4 w-28 mx-auto mb-4" />
            <Skeleton className="h-10 sm:h-12 w-full mb-3" />
            <Skeleton className="h-10 sm:h-12 w-5/6 mx-auto mb-6" />
            <Skeleton className="h-5 w-3/4 mx-auto mb-8" />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-28 rounded-xl" />
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="w-full shrink-0 self-stretch">
        <PageContainer className="py-10 lg:py-14">
          <div className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
            <div className="min-w-0 w-full">
              <Skeleton className="h-8 w-56 mb-3" />
              <Skeleton className="h-5 w-80 max-w-full" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 w-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </main>
  );
}

