# Blog App

Multi-user blog platform built with **Next.js (App Router)**, **PostgreSQL**, **Drizzle ORM**, and **NextAuth.js v5** (credentials).

## What this app does

- **Authentication**: email + password (Credentials), JWT sessions (NextAuth v5)
- **Blogs**: each post has **heading**, **tagline**, **category**, **cover image URL (optional)**, and **rich text content**
- **Ownership rules**: logged-in users can only manage **their own** posts (create/update/delete)
- **Community reading**: guests can browse all posts

## Routes (important behavior)

| Route | Guest | Logged in |
|---|---|---|
| `/` | Community feed | **My Blogs** dashboard (only your posts) |
| `/page`, `/page/[id]` | Community feed / article | Redirects to `/` |
| `/login`, `/signup` | Auth pages | Redirects to `/` |

## Tech stack

- Next.js 16
- React 19
- Tailwind CSS v4
- NextAuth.js v5 (Credentials + Drizzle adapter)
- Drizzle ORM + PostgreSQL
- TipTap editor (rich text)
- UploadThing (optional image uploads)

## Prerequisites

- Node.js (LTS recommended)
- PostgreSQL database

## Environment variables

Create a `.env` file in the project root (see your existing `.env` in this repo as reference).

Required:
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — NextAuth secret
- `AUTH_URL` — usually `http://localhost:3000` for local dev

Optional:
- `UPLOADTHING_TOKEN` — only required if you want UploadThing uploads

## Setup (local dev)

From the project root:

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Then open `http://localhost:3000`.

## Database workflow (Drizzle)

This repo uses migrations (recommended for teams).

- `npm run db:generate`: generates migration files from `db/schema.ts`
- `npm run db:migrate`: applies migrations to Postgres
- `npm run db:studio`: opens Drizzle Studio to inspect tables/data

## Useful scripts

```bash
npm run dev        # start local dev server
npm run build      # production build (typecheck + compile)
npm run start      # run production server (after build)
npm run lint       # eslint
```

## Project structure (high level)

- `app/` — Next.js App Router pages, components, server actions
- `db/schema.ts` — Drizzle schema (users, blogs, auth tables)
- `auth.ts`, `auth.config.ts` — NextAuth configuration
- `proxy.ts` — middleware / route protection + redirects

## Rich text editor notes (TipTap)

The editor is implemented in:
- `app/components/RichTextEditor.tsx`

Content is stored as **HTML** in the database and rendered with the blog content renderer.
