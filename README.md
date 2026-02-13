# log file

The most dead-simple blog setup you can have. Drop a markdown file in `posts/`, push to git, and it's live. No CMS, no database, no admin panel. Just files.

## Setup

```bash
npm install
npm run dev       # http://localhost:3000
```

`npm run build` for a production build, `npm run start` to serve it.

## Project Structure

```
├── app/
│   ├── layout.tsx                 # Root layout, global CSS import
│   ├── page.tsx                   # Home — lists all posts by date
│   ├── globals.css                # All styles (including prose/code blocks)
│   ├── components/
│   │   ├── toolbar.tsx            # Nav bar with back button and theme toggle
│   │   ├── theme-provider.tsx     # Dark/light mode context
│   │   └── theme-script.tsx       # Inline script to prevent flash of wrong theme
│   └── posts/
│       └── [slug]/page.tsx        # Individual post page (MDX rendering)
├── lib/
│   └── posts.ts                   # Reads posts/ dir, parses frontmatter, sorts by date
├── posts/                         # Markdown content lives here
│   └── *.md
└── public/
    └── images/posts/              # Post images (matched by slug)
```

## Writing a Post

Create a `.md` file in `posts/`. The filename becomes the URL slug.

```
posts/my-new-post.md  →  /posts/my-new-post
```

Frontmatter at the top:

```yaml
---
title: "Post Title"
date: "2026-02-13"
description: "Optional summary for metadata."
---
```

Everything below the frontmatter is standard markdown. GFM features (tables, strikethrough, autolinks) work via `remark-gfm`. Fenced code blocks get syntax highlighting automatically via `rehype-pretty-code` and Shiki.

## How It Works

Posts are read from the filesystem at build time by `lib/posts.ts`. It uses `gray-matter` to split frontmatter from content, then returns sorted metadata for the home page and full content for individual post pages.

Rendering uses `next-mdx-remote` in RSC mode — markdown is compiled to React on the server, no client-side JS for post content. The MDX pipeline runs two plugins:

- **remark-gfm** — GitHub Flavored Markdown (tables, task lists, etc.)
- **rehype-pretty-code** — syntax highlighting with Shiki, using the `github-dark` theme

Post images are optional. Drop an image in `public/images/posts/` with the same name as the post slug (e.g., `my-post.png`) and it gets picked up automatically.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for server-side MDX
- [gray-matter](https://github.com/jonschlinkert/gray-matter) for frontmatter parsing
- [rehype-pretty-code](https://github.com/rehype-pretty/rehype-pretty-code) + [Shiki](https://shiki.style) for syntax highlighting
- [remark-gfm](https://github.com/remarkjs/remark-gfm) for GitHub Flavored Markdown
- [Lucide React](https://lucide.dev) for icons
- Deployed on [Vercel](https://vercel.com)
