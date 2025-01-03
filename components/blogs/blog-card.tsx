import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  post_type: string;
  categories: {
    name: string;
  }[];
  slug?: string;
}

function stripHtmlAndTruncate(html: string, maxLength: number): string {
  const strippedText = html.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
  return strippedText.length > maxLength
    ? strippedText.slice(0, maxLength) + "..."
    : strippedText;
}

export function BlogCard({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts?.map((post) => (
        <div
          key={post.id}
          className="group space-y-3 border rounded-xl overflow-hidden"
        >
          <Link href={`/blogs/${post.slug || slugify(post.title)}`}>
            <Image
              src={post.image_url}
              alt={post.title}
              width={600}
              height={400}
              className="object-cover w-full aspect-[16/9]"
              priority
            />
          </Link>
          <div className="space-y-6 py-6 px-4">
            <div className="flex items-center gap-2">
              <p className="text-primary hover:text-[#85d54a]">
                {post.categories.name}
              </p>
              <span className="text-muted-foreground">•</span>
              <time className="text-muted-foreground hover:text-[#85d54a]">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <h2 className="text-xl font-semibold hover:text-[#85d54a] max-w-[15em]">
              <Link href={`/blogs/${post.slug || slugify(post.title)}`}>
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground text-sm">
              {stripHtmlAndTruncate(post.content, 80)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
