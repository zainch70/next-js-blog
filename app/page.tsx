import { auth } from "@/auth";
import { getMyBlogs, getPublicBlogs } from "@/app/actions";
import HomeHero from "./components/HomeHero";
import BlogFeed from "./components/BlogFeed";
import MyBlogsDashboard from "./components/MyBlogsDashboard";
import HashScroll from "./components/HashScroll";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth();

  if (session?.user?.id) {
    const myBlogs = await getMyBlogs();

    return (
      <MyBlogsDashboard blogs={myBlogs} userName={session.user?.name} />
    );
  }

  const publicBlogs = await getPublicBlogs();

  return (
    <main className="flex w-full min-h-0 flex-1 flex-col items-stretch overflow-x-hidden bg-background text-foreground">
      <HashScroll />
      <HomeHero />
      <BlogFeed
        blogs={publicBlogs}
        title="Community Blogs"
        description="Explore what everyone has published."
      />
    </main>
  );
}
