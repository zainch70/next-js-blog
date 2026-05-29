import Link from "next/link";
import CoverImage from "./CoverImage";
import { formatBlogDate } from "@/app/lib/format";
import type { Blog } from "./blogTypes";

interface BlogCardViewProps {
  blog: Blog;
  authorName?: string;
  href: string;
}

export default function BlogCardView({ blog, authorName, href }: BlogCardViewProps) {
  const dateLabel = formatBlogDate(blog.createdAt);

  return (
    <article className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-accent/20 transition-all h-full min-h-0">
      <Link
        href={href}
        className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
      >
        {blog.imageUrl ? (
          <div className="relative">
            <CoverImage
              src={blog.imageUrl}
              alt={blog.heading}
              imageClassName="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <p className="absolute bottom-3 left-4 right-4 text-white text-sm font-bold leading-snug line-clamp-2 drop-shadow-sm pointer-events-none">
              {blog.heading}
            </p>
          </div>
        ) : (
          <div className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-accent-soft to-background">
            <span className="text-4xl font-bold text-muted/40">
              {blog.heading.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm font-semibold text-accent mb-2">
            {blog.category || "Blog"}
          </p>

          <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 mb-2 min-h-[2.75rem]">
            {blog.heading}
          </h3>

          <p className="text-sm text-muted leading-relaxed line-clamp-3 flex-1 mb-4">
            {blog.tagline}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted">
            <span className="font-medium">{authorName ?? "Author"}</span>
            {dateLabel && <span>{dateLabel}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}

