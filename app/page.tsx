import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { Toolbar } from "./components/toolbar";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="home">
      <Toolbar />
      <div className="card-grid">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="card"
          >
            {post.image && (
              <span className="card-image">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={450}
                  height={253}
                />
              </span>
            )}
            <span className="card-body">
              <span className="card-title">{post.title}</span>
              <span className="card-date">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {post.description && (
                <span className="card-description">{post.description}</span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
