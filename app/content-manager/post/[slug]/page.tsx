import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import DeletePostButton from "@/components/content-manager/DeletePostButton";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  if (!slug) {
    notFound();
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("*, categories(name)")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    console.error("Error fetching post:", error);
    notFound();
  }

  // Ensure categories is handled correctly
  const categoryName = Array.isArray(post.categories)
    ? post.categories[0]?.name
    : post.categories?.name;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link
          href={`/content-manager/${post.post_type}`}
          className="text-blue-500 hover:underline"
        >
          ← Back to all {post.post_type === "blogs" ? "blogs" : "news"}
        </Link>
        <div className="flex gap-2">
          <DeletePostButton
            slug={post.slug || slugify(post.title)}
            title={post.title}
          />
          <Link
            href={`/content-manager/edit/${post.slug || slugify(post.Title)}`}
            passHref
          >
            <Button>Edit Post</Button>
          </Link>
        </div>
      </div>
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.image_url && (
          <div className="mb-6">
            <Image
              src={post.image_url}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
        )}
        <div className="flex justify-between items-center text-gray-500 mb-6">
          <p>
            Published on{" "}
            {new Date(post.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {categoryName && (
            <p className="text-blue-500">Category: {categoryName}</p>
          )}
        </div>
        <div
          className="tiptap max-w-none"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.content).replace(
              /<img/g,
              '<img style="max-width:100%;height:auto;"'
            ),
          }}
        />
      </article>
    </main>
  );
}

// Helper function to sanitize HTML
function sanitizeHtml(html: string): string {
  return html.replace(/<script.*?>.*?<\/script>/gi, "").trim();
}
