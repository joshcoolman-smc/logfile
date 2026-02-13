import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Toolbar } from "@/app/components/toolbar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.meta.title} — log file` };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="post-page">
      <Toolbar showBack />
      <article className="post">
        <header className="post-header">
          <time className="post-date">
            {new Date(post.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="post-title">{post.meta.title}</h1>
        </header>

        <div className="prose">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                format: "md",
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-dark" }],
                ],
              },
            }}
          />
        </div>
      </article>
    </div>
  );
}
