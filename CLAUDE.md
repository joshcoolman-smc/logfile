# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start dev server on localhost:3000
npm run build  # Production build (use to verify changes)
npm run start  # Serve production build
```

No linter or test runner is configured.

## Architecture

Minimal markdown blog built with Next.js (App Router), deployed on Vercel.

**Content flow:** Markdown files in `posts/` with YAML frontmatter (title, date) → parsed by `lib/posts.ts` using gray-matter → rendered via next-mdx-remote with remark-gfm.

**Key files:**
- `lib/posts.ts` — reads `posts/` directory, parses frontmatter, returns sorted post metadata and content
- `app/page.tsx` — home page listing all posts sorted by date (newest first)
- `app/posts/[slug]/page.tsx` — individual post page using `MDXRemote` RSC for server-side markdown rendering
- `app/layout.tsx` — root layout with global CSS

**Routing:** File names in `posts/` become URL slugs (e.g., `posts/my-post.md` → `/posts/my-post`). Static params are generated at build time via `generateStaticParams`.

**Path alias:** `@/*` maps to the project root.

## Adding a Post

Create a `.md` file in `posts/` with frontmatter:

```yaml
---
title: "Post Title"
date: "2026-02-13"
---
```
