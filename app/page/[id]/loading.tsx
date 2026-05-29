import PageContainer from "@/app/components/PageContainer";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-border/60 ${className}`.trim()} />;
}

export default function Loading() {
  return (
    <main className="w-full flex-1 bg-background text-foreground">
      <PageContainer size="narrow" as="article" className="py-8 lg:py-12 text-left">
        <Skeleton className="h-5 w-32 mb-8" />

        <div className="mb-8 rounded-2xl overflow-hidden border border-border shadow-sm">
          <Skeleton className="aspect-[16/9] w-full rounded-none" />
        </div>

        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-5/6 mb-6" />

        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-11/12 mb-8" />

        <div className="flex items-center justify-between gap-2 pb-8 mb-8 border-b border-border">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </PageContainer>
    </main>
  );
}

