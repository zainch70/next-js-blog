"use client";

import { useState } from "react";
import Link from "next/link";
import CoverImage from "./CoverImage";
import { formatBlogDate } from "@/app/lib/format";
import type { Blog } from "./blogTypes";

interface BlogCardProps {
  blog: Blog;
  authorName?: string;
  readOnly?: boolean;
  detailHref?: string;
  onEdit?: (blog: Blog) => void;
  onDelete?: (id: number) => void;
}

export default function BlogCard({
  blog,
  authorName,
  readOnly = false,
  detailHref,
  onEdit,
  onDelete,
}: BlogCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const href = detailHref ?? (readOnly ? `/page/${blog.id}` : undefined);
  const dateLabel = formatBlogDate(blog.createdAt);

  const cardBody = (
    <>
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
    </>
  );

  return (
    <article className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-accent/20 transition-all h-full min-h-0">
      {!readOnly && onEdit && onDelete && (
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="w-8 h-8 rounded-full bg-card/90 backdrop-blur text-muted hover:text-foreground shadow-md flex items-center justify-center cursor-pointer"
            aria-label="Blog actions"
          >
            ⋮
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-32 bg-card border border-border rounded-xl shadow-lg z-40 py-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(blog);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-foreground hover:bg-accent-soft cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(blog.id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer border-t border-border"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {href ? (
        <Link href={href} className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl">
          {cardBody}
        </Link>
      ) : (
        <div className="flex flex-col flex-1">{cardBody}</div>
      )}
    </article>
  );
}
