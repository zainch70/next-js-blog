import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getPublicBlogs } from "@/app/actions";
import BlogFeed from "@/app/components/BlogFeed";
import HomeHero from "@/app/components/HomeHero";

export const dynamic = "force-dynamic";

export default async function CommunityBlogsPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  const publicBlogs = await getPublicBlogs();

  return (
    <main className="flex w-full min-h-0 flex-1 flex-col items-stretch overflow-x-hidden bg-background text-foreground">
      <HomeHero />
      <BlogFeed
        blogs={publicBlogs}
        title="Community Blogs"
        description="All published posts from our authors."
      />
    </main>
  );
}
