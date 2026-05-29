"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog, updateBlog, deleteBlog } from "@/app/actions";
import BlogForm, { type BlogFormData } from "./BlogForm";
import BlogCard from "./BlogCard";
import BlogGrid from "./BlogGrid";
import Toast from "./Toast";
import type { Blog } from "./blogTypes";

const emptyForm: BlogFormData = {
  heading: "",
  category: "",
  tagline: "",
  imageUrl: "",
  content: "",
};

interface BlogDashboardProps {
  initialBlogs: Blog[];
}

export default function BlogDashboard({ initialBlogs }: BlogDashboardProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "write">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<BlogFormData>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const router = useRouter();

  const filteredBlogs = blogs.filter((blog) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      blog.heading.toLowerCase().includes(q) ||
      blog.tagline.toLowerCase().includes(q)
    );
  });

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newBlog = await createBlog({
        heading: formData.heading,
        category: formData.category,
        tagline: formData.tagline,
        imageUrl: formData.imageUrl || null,
        content: formData.content,
      });
      if (newBlog) {
        setBlogs((prev) => [...prev, newBlog]);
        setToast({ message: "Blog published successfully!", type: "success" });
        resetForm();
        setActiveTab("list");
        router.refresh();
      }
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Failed to create blog",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    setLoading(true);
    try {
      const updated = await updateBlog(id, {
        heading: formData.heading,
        category: formData.category,
        tagline: formData.tagline,
        imageUrl: formData.imageUrl || null,
        content: formData.content,
      });
      if (updated) {
        setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
        setToast({ message: "Blog updated successfully!", type: "success" });
        resetForm();
        router.refresh();
      }
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Failed to update blog",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog post?")) return;
    setLoading(true);
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setToast({ message: "Blog deleted.", type: "info" });
      router.refresh();
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Failed to delete blog",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setFormData({
      heading: blog.heading,
      category: blog.category || "",
      tagline: blog.tagline,
      imageUrl: blog.imageUrl || "",
      content: blog.content,
    });
    setActiveTab("write");
  };

  return (
    <div className="w-full space-y-8 relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex justify-center">
        <div className="bg-accent-soft/50 border border-border p-1 rounded-2xl flex w-full max-w-sm">
          <button
            onClick={() => {
              setActiveTab("list");
              if (editingId) resetForm();
            }}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "list"
                ? "bg-card text-accent shadow-sm"
                : "text-muted"
            }`}
          >
            My Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab("write")}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "write"
                ? "bg-card text-accent shadow-sm"
                : "text-muted"
            }`}
          >
            {editingId ? "Edit Blog" : "Write Blog"}
          </button>
        </div>
      </div>

      {activeTab === "list" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search your blogs..."
            className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {filteredBlogs.length === 0 ? (
            <p className="p-12 text-center text-muted italic bg-card border border-border rounded-2xl">
              {blogs.length === 0
                ? "You have not written any blogs yet."
                : "No blogs match your search."}
            </p>
          ) : (
            <BlogGrid>
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  authorName="You"
                  onEdit={handleStartEdit}
                  onDelete={handleDelete}
                />
              ))}
            </BlogGrid>
          )}
        </div>
      )}

      {activeTab === "write" && (
        <div className="w-full max-w-3xl mx-auto lg:max-w-4xl">
        <BlogForm
          data={formData}
          onChange={setFormData}
          loading={loading}
          editingId={editingId}
          onCancel={() => {
            resetForm();
            setActiveTab("list");
          }}
          onSubmit={(e) => {
            e.preventDefault();
            if (editingId) handleUpdate(editingId);
            else handleCreate(e);
          }}
        />
        </div>
      )}
    </div>
  );
}
