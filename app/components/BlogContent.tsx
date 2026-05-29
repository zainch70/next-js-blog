import Image from "next/image";
import { normalizeBlogHtml } from "@/app/lib/html";
import { shouldOptimizeImage } from "@/app/lib/images";
import type { ReactNode } from "react";

interface BlogContentProps {
  html: string;
  className?: string;
}

function getAttr(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match?.[1];
}

function renderHtmlWithNextImages(html: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  const imgRegex = /<img\s+[^>]*\/?>/gi;

  while ((match = imgRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const chunk = html.slice(lastIndex, match.index);
      if (chunk.trim()) {
        nodes.push(
          <div
            key={`html-${key++}`}
            className="blog-content-chunk"
            dangerouslySetInnerHTML={{ __html: chunk }}
          />
        );
      }
    }

    const tag = match[0];
    const src = getAttr(tag, "src");
    const alt = getAttr(tag, "alt") ?? "Blog image";

    if (src) {
      nodes.push(
        <figure key={`img-${key++}`} className="my-6">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted/20">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized={!shouldOptimizeImage(src)}
            />
          </div>
        </figure>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < html.length) {
    const rest = html.slice(lastIndex);
    if (rest.trim()) {
      nodes.push(
        <div
          key={`html-${key++}`}
          className="blog-content-chunk"
          dangerouslySetInnerHTML={{ __html: rest }}
        />
      );
    }
  }

  if (nodes.length === 0) {
    return [
      <div
        key="html-0"
        className="blog-content-chunk"
        dangerouslySetInnerHTML={{ __html: html }}
      />,
    ];
  }

  return nodes;
}

export default function BlogContent({ html, className = "" }: BlogContentProps) {
  const prepared = normalizeBlogHtml(html);
  const hasImages = /<img\s+[^>]*\/?>/i.test(prepared);

  if (!hasImages) {
    return (
      <div
        className={`blog-content ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: prepared }}
      />
    );
  }

  return (
    <div className={`blog-content ${className}`.trim()}>
      {renderHtmlWithNextImages(prepared)}
    </div>
  );
}
