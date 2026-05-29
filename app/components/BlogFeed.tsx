import BlogCard from "./BlogCard";
import BlogGrid from "./BlogGrid";
import PageContainer from "./PageContainer";

export interface BlogFeedItem {
  id: number;
  heading: string;
  category?: string | null;
  tagline: string;
  imageUrl?: string | null;
  content: string;
  createdAt?: Date | null;
  authorName: string;
}

interface BlogFeedProps {
  blogs: BlogFeedItem[];
  title?: string;
  description?: string;
}

export default function BlogFeed({
  blogs,
  title = "Latest Blogs",
  description,
}: BlogFeedProps) {
  return (
    <section id="blogs" className="w-full shrink-0 self-stretch scroll-mt-[4.5rem]">
      <PageContainer className="py-10 lg:py-14">
        <header className="mb-8 lg:mb-10 w-full text-left">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                {title}
              </h2>
              {description && (
                <p className="text-sm lg:text-base text-muted mt-2 max-w-2xl">
                  {description}
                </p>
              )}
            </div>
            <p className="text-sm text-muted shrink-0">
              {blogs.length} {blogs.length === 1 ? "post" : "posts"}
            </p>
          </div>
        </header>

        {blogs.length === 0 ? (
          <p className="p-12 lg:p-16 text-center text-muted italic bg-card border border-border rounded-2xl">
            No blogs published yet. Be the first to write one!
          </p>
        ) : (
          <BlogGrid>
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={{
                  id: blog.id,
                  heading: blog.heading,
                  category: blog.category,
                  tagline: blog.tagline,
                  imageUrl: blog.imageUrl,
                  content: blog.content,
                  createdAt: blog.createdAt,
                }}
                readOnly
                authorName={blog.authorName}
                detailHref={`/page/${blog.id}`}
              />
            ))}
          </BlogGrid>
        )}
      </PageContainer>
    </section>
  );
}
