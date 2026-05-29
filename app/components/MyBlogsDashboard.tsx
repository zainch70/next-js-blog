import BlogDashboard from "./BlogDashboard";
import PageContainer from "./PageContainer";
import type { Blog } from "./BlogCard";

interface MyBlogsDashboardProps {
  blogs: Blog[];
  userName?: string | null;
}

export default function MyBlogsDashboard({
  blogs,
  userName,
}: MyBlogsDashboardProps) {
  return (
    <main className="flex w-full min-h-0 flex-1 flex-col items-stretch bg-background text-foreground">
      <PageContainer className="py-8 lg:py-12">
        <header className="mb-8 lg:mb-10" id="blogs">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            My Blogs
          </h1>
          <p className="text-sm lg:text-base text-muted mt-2 max-w-2xl">
            {userName ? `Signed in as ${userName}. ` : ""}
            Only your posts are shown here — create, edit, or delete below.
          </p>
        </header>

        <BlogDashboard initialBlogs={blogs} />
      </PageContainer>
    </main>
  );
}
