import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { Toolbar } from "./components/toolbar";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="home-page">
      <Toolbar />
      <main className="home">
        <div className="card-grid">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="card"
          >
            <span className="card-image">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={450}
                  height={253}
                />
              ) : null}
            </span>
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
    </div>
  );
}
