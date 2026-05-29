import Link from "next/link";
import PageContainer from "./PageContainer";

export default function HomeHero() {
  return (
    <section className="w-full shrink-0 border-b border-border/60 bg-gradient-to-b from-accent-soft/30 to-background">
      <PageContainer className="pt-10 pb-10 lg:pt-14 lg:pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-bold text-accent uppercase tracking-widest mb-3">
            Welcome
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Discover stories from our community
          </h1>
          <p className="text-base lg:text-lg text-muted mb-8 max-w-2xl mx-auto">
            Read the latest posts below, or sign in to write and manage your own
            blogs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="btn-primary px-6 py-3 rounded-xl text-sm sm:text-base"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="bg-card border border-border text-foreground font-bold px-6 py-3 rounded-xl hover:bg-accent-soft transition-colors text-sm sm:text-base"
            >
              Log in
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
