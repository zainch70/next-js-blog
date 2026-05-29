"use server";

import { db } from "@/db";
import { users, blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and, desc } from "drizzle-orm";
import { auth, signOut } from "@/auth";
import bcrypt from "bcryptjs";
import { normalizeBlogHtml } from "@/app/lib/html";

export type BlogInput = {
  heading: string;
  category: string;
  tagline: string;
  imageUrl?: string | null;
  content: string;
};

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
    return { success: true };
  } catch {
    return { error: "An account with this email already exists." };
  }
}

export async function createBlog(data: BlogInput) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to create a blog.");
  }

  const userId = Number(session.user.id);

  const [blog] = await db
    .insert(blogs)
    .values({
      heading: data.heading,
      category: data.category || "Blog",
      tagline: data.tagline,
      imageUrl: data.imageUrl || null,
      content: normalizeBlogHtml(data.content),
      userId,
    })
    .returning();

  revalidatePath("/");
  return blog;
}

export async function updateBlog(id: number, data: BlogInput) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to update a blog.");
  }

  const userId = Number(session.user.id);

  const [updated] = await db
    .update(blogs)
    .set({
      heading: data.heading,
      category: data.category || "Blog",
      tagline: data.tagline,
      imageUrl: data.imageUrl,
      content: normalizeBlogHtml(data.content),
      updatedAt: new Date(),
    })
    .where(and(eq(blogs.id, id), eq(blogs.userId, userId)))
    .returning();

  revalidatePath("/");
  return updated;
}

export async function deleteBlog(id: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to delete a blog.");
  }

  const userId = Number(session.user.id);

  await db
    .delete(blogs)
    .where(and(eq(blogs.id, id), eq(blogs.userId, userId)));

  revalidatePath("/");
  return { success: true };
}

export async function getMyBlogs() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const userId = Number(session.user.id);

  return db
    .select()
    .from(blogs)
    .where(eq(blogs.userId, userId))
    .orderBy(desc(blogs.createdAt));
}

/** Public community feed — guests only (logged-in users use getMyBlogs on /). */
export async function getPublicBlogs() {
  return db
    .select({
      id: blogs.id,
      heading: blogs.heading,
      category: blogs.category,
      tagline: blogs.tagline,
      imageUrl: blogs.imageUrl,
      content: blogs.content,
      createdAt: blogs.createdAt,
      authorName: users.name,
      authorId: users.id,
    })
    .from(blogs)
    .innerJoin(users, eq(blogs.userId, users.id))
    .orderBy(desc(blogs.createdAt));
}

/** Public article view (guests). Logged-in users are redirected away from /page. */
export async function getBlogById(id: number) {
  const [blog] = await db
    .select({
      id: blogs.id,
      heading: blogs.heading,
      category: blogs.category,
      tagline: blogs.tagline,
      imageUrl: blogs.imageUrl,
      content: blogs.content,
      createdAt: blogs.createdAt,
      userId: blogs.userId,
      authorName: users.name,
    })
    .from(blogs)
    .innerJoin(users, eq(blogs.userId, users.id))
    .where(eq(blogs.id, id));

  if (!blog) return null;

  return blog;
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}
