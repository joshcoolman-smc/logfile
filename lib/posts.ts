import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  image: string | null;
  description: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "posts");
const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

function getPostImage(slug: string): string | null {
  const imagesDir = path.join(process.cwd(), "public", "images", "posts");
  for (const ext of imageExtensions) {
    const imagePath = path.join(imagesDir, `${slug}${ext}`);
    if (fs.existsSync(imagePath)) {
      return `/images/posts/${slug}${ext}`;
    }
  }
  return null;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts: PostMeta[] = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      title: data.title || slug,
      date: data.date ? String(data.date) : "",
      slug,
      image: getPostImage(slug),
      description: data.description || "",
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      title: data.title || slug,
      date: data.date ? String(data.date) : "",
      slug,
      image: getPostImage(slug),
      description: data.description || "",
    },
    content,
  };
}
