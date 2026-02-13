---
title: "How I Made a Blog Platform from My Phone"
date: "2026-02-13"
description: "No laptop, no desktop, no IDE — just a phone and a conversation with an AI coding agent."
---

I made this blog from my phone. No laptop, no desktop, no IDE. Just a phone and a conversation with an AI coding agent.

## The Setup

I already had a repo — a sandbox project for design experiments — that happened to have a working markdown blog implementation inside it. The idea was simple: take the blog pattern, strip it down, and spin it into its own thing.

The tool I used is Claude Code, Anthropic's AI coding assistant. It runs in a terminal, reads your codebase, and writes code based on what you ask for. I opened it on my phone and described what I wanted: a minimal blog that reads markdown files. Black background. No admin panel. No CMS. Just files.

## What Happened

Claude examined my existing blog implementation — the markdown parser, the route structure, the rendering pipeline — and used it as a reference to build a new standalone version. The key pieces:

- **Next.js** for the framework and routing
- **gray-matter** for parsing YAML frontmatter from markdown files
- **next-mdx-remote** for server-side markdown rendering
- **remark-gfm** for GitHub Flavored Markdown support

The blog reads `.md` files from a `posts/` directory. Each file has a YAML header with a title and date. The homepage lists all posts. That's it.

## The Architecture

There's no database. No API. No authentication. The entire content layer is just a folder of markdown files that get read at build time:

```
posts/
  how-i-made-a-blog-from-my-phone.md
```

Each post becomes a route automatically. The file name becomes the URL slug. New post? Add a markdown file. Delete a post? Delete the file.

## Why This Works

Most blog platforms solve problems I don't have. I don't need a rich text editor — markdown is fine. I don't need draft states or publishing workflows — git commits handle that. I don't need user accounts or comments — this is a log file, not a forum.

What I need is a place to write things down that renders well and deploys automatically. A Vercel project pointed at a git repo does exactly that. Push a markdown file, site rebuilds, post is live.

## The Meta Part

You're reading the first post on a blog that was built entirely through a conversation on a phone screen. The AI read an existing codebase, understood the patterns, and produced a working blog. I described what I wanted in plain language and it wrote the code.

This is what building software looks like now. Not for everything, and not without judgment — but for a task like this, it's remarkably effective. The whole thing went from idea to deployed site in a single session.
