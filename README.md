# Blog App

A multi-user blog platform built with **Next.js**, **PostgreSQL**, **Drizzle ORM**, and **NextAuth.js** (credentials).

## Features

- **Sign up / Log in** with email and password (NextAuth.js JWT sessions)
- **`/` (My Blogs)** — logged-in users see, create, edit, and delete only their own posts
- **`/page` (Community)** — read-only feed of other users' blogs (your posts are hidden)
- Each blog has: **heading**, **tagline**, **cover image**, and **rich text content**
- Image upload via UploadThing (optional — paste URL works too)

## Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Set in `.env` (you can reuse values from `D:\Fantech Labs\Nextjs\my-app`):

   - `DATABASE_URL` — PostgreSQL connection string (use a **separate database** e.g. `blogdb`)
   - `AUTH_SECRET` — same as your reference app or generate a new one
   - `UPLOADTHING_TOKEN` — optional, for image uploads

3. Install dependencies and run migrations (do **not** use `db:push` if you want migration history):

   ```bash
   npm install
   npm run db:generate
   npm run db:migrate
   ```

   - `db:generate` — reads `db/schema.ts` and creates SQL files under `drizzle/`
   - `db:migrate` — applies those migrations to PostgreSQL

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000), sign up, and start writing.

## Routes

| Route     | Description                          |
| --------- | ------------------------------------ |
| `/login`  | Sign in                              |
| `/signup` | Register                             |
| `/`       | Your blogs (CRUD)                    |
| `/page`   | Other users' blogs (read-only)       |

## Tech stack

- Next.js 16 (App Router)
- NextAuth.js v5 (Credentials + Drizzle adapter)
- Drizzle ORM + PostgreSQL
- Tailwind CSS v4
- UploadThing (optional image uploads)
# next-js-blog
