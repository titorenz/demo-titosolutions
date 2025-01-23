import Image from "next/image";
import Link from "next/link";
import { formatDate, truncateTexts, slugify } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
  slug?: string;
}

export function RecentPosts({ posts }: { posts: Post[] }) {
  if (!posts) return null;

  return (
    <div className="space-y-4 border px-6 py-7 rounded-xl">
      <h2 className="text-lg font-semibold inline-block border-b-2 border-current">
        Recent Posts
      </h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.slug || slugify(post.title)}`}
            className="flex items-center space-x-4 group"
          >
            <Image
              src={post.image_url}
              alt={post.title}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
            <div className="flex-1 space-y-1">
              <p className="text-xs text-muted-foreground hover:text-[#85d54a]">
                {formatDate(post.created_at)}
              </p>
              <h3 className="text-md font-semibold leading-snug hover:text-[#85d54a]">
                {truncateTexts(post.title, 50)}{" "}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
