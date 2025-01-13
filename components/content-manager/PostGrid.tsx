import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  post_type: string;
  categories:
    | {
        name: string;
      }
    | { name: string }[]; // Can be an array or a single object
  slug?: string;
}

function stripHtmlAndTruncate(html: string, maxLength: number): string {
  const strippedText = html.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
  return strippedText.length > maxLength
    ? strippedText.slice(0, maxLength) + "..."
    : strippedText;
}

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts?.map((post) => (
        <Link
          href={`/content-manager/post/${post.slug || slugify(post.title)}`}
          key={post.id}
          className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48">
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {stripHtmlAndTruncate(post.content, 80)}
            </p>
            <p className="text-gray-500 text-sm mb-2">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-blue-500 text-sm">
              {Array.isArray(post.categories)
                ? post.categories.map((category) => category.name).join(", ")
                : post.categories?.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
