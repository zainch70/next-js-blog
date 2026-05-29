import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CoverImage from "@/app/components/CoverImage";
import PageContainer from "@/app/components/PageContainer";
import { auth } from "@/auth";
import { getBlogById } from "@/app/actions";
import { formatBlogDate } from "@/app/lib/format";
import BlogContent from "@/app/components/BlogContent";

export const dynamic = "force-dynamic";

export default async function CommunityBlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const blogId = Number(id);

  if (Number.isNaN(blogId)) notFound();

  const blog = await getBlogById(blogId);
  if (!blog) notFound();

  return (
    <main className="w-full flex-1 bg-background text-foreground">
      <PageContainer size="narrow" as="article" className="py-8 lg:py-12 text-left">
        <Link
          href="/#blogs"
          className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-hover hover:underline mb-8"
        >
          ← Back to blogs
        </Link>

        {blog.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-border shadow-sm">
            <CoverImage
              src={blog.imageUrl}
              alt={blog.heading}
              priority
              aspectClass="aspect-[16/9]"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <p className="text-sm font-semibold text-accent mb-2">
          {blog.category || "Blog"}
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
          {blog.heading}
        </h1>

        <p className="text-lg lg:text-xl text-muted mb-6 leading-relaxed">
          {blog.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted pb-8 mb-8 border-b border-border">
          <span className="font-medium">{blog.authorName}</span>
          <span>{formatBlogDate(blog.createdAt)}</span>
        </div>

        <BlogContent html={blog.content} className="text-foreground/90" />
      </PageContainer>
    </main>
  );
}
