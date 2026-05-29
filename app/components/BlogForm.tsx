"use client";

import { useState } from "react";
import { UploadButton } from "@/app/utils/uploadthing";
import RichTextEditor from "./RichTextEditor";
import CoverImage from "./CoverImage";

export interface BlogFormData {
  heading: string;
  category: string;
  tagline: string;
  imageUrl: string;
  content: string;
}

interface BlogFormProps {
  data: BlogFormData;
  onChange: (data: BlogFormData) => void;
  loading: boolean;
  editingId: number | null;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BlogForm({
  data,
  onChange,
  loading,
  editingId,
  onCancel,
  onSubmit,
}: BlogFormProps) {
  const [errors, setErrors] = useState<{
    heading?: string;
    category?: string;
    tagline?: string;
    content?: string;
  }>({});

  const setField = <K extends keyof BlogFormData>(key: K, value: BlogFormData[K]) => {
    onChange({ ...data, [key]: value });
    if (errors[key as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!data.heading.trim()) newErrors.heading = "Heading is required.";
    if (!data.category.trim()) newErrors.category = "Category is required.";
    if (!data.tagline.trim()) newErrors.tagline = "Description is required.";
    const plainContent = data.content.replace(/<[^>]*>/g, "").trim();
    if (!plainContent) newErrors.content = "Blog content is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onSubmit(e);
  };

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent";

  return (
    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-foreground mb-6">
        {editingId ? "Edit blog post" : "Write a new blog"}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">
            Heading *
          </label>
          <input
            type="text"
            placeholder="My awesome blog title"
            className={`${inputClass} ${errors.heading ? "border-rose-500" : ""}`}
            value={data.heading}
            onChange={(e) => setField("heading", e.target.value)}
          />
          {errors.heading && (
            <p className="text-xs text-rose-500 mt-1">{errors.heading}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">
            Category *
          </label>
          <input
            type="text"
            placeholder="e.g. AI Integration, Digital Marketing"
            className={`${inputClass} ${errors.category ? "border-rose-500" : ""}`}
            value={data.category}
            onChange={(e) => setField("category", e.target.value)}
          />
          {errors.category && (
            <p className="text-xs text-rose-500 mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">
            Short description *
          </label>
          <textarea
            rows={3}
            placeholder="Brief summary shown on the blog card (like Fantech Labs excerpt)"
            className={`${inputClass} resize-none ${errors.tagline ? "border-rose-500" : ""}`}
            value={data.tagline}
            onChange={(e) => setField("tagline", e.target.value)}
          />
          {errors.tagline && (
            <p className="text-xs text-rose-500 mt-1">{errors.tagline}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">
            Cover image (optional)
          </label>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="text"
              placeholder="Paste image URL or upload below"
              className={`flex-1 ${inputClass}`}
              value={data.imageUrl}
              onChange={(e) => setField("imageUrl", e.target.value)}
            />
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  setField("imageUrl", res[0].ufsUrl || res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`Upload failed: ${error.message}`);
              }}
              className="ut-button:bg-accent ut-button:hover:bg-accent-hover ut-button:text-white ut-button:font-bold ut-button:py-2.5 ut-button:px-4 ut-button:rounded-lg ut-button:text-sm ut-allowed-content:hidden"
            />
          </div>
          {data.imageUrl.trim() ? (
            <div className="mt-3 rounded-xl overflow-hidden border border-border max-w-md">
              <CoverImage
                src={data.imageUrl.trim()}
                alt="Cover preview"
                aspectClass="aspect-video"
                sizes="400px"
              />
            </div>
          ) : null}
        </div>

        <div>
          <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">
            Content *
          </label>
          <RichTextEditor
            value={data.content}
            onChange={(html) => setField("content", html)}
          />
          {errors.content && (
            <p className="text-xs text-rose-500 mt-1">{errors.content}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary py-2.5 rounded-xl disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Saving..." : editingId ? "Update Blog" : "Publish Blog"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-muted font-bold hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
