import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PostForm from "@/components/content-manager/PostForm";

export const dynamic = "force-dynamic";

interface EditPostProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPost({ params }: EditPostProps) {
  const resolvedParams = await params;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <div className="max-w-3xl mx-auto">
        <PostForm
          postId={post.id}
          initialTitle={post.title}
          initialContent={post.content}
          initialImageUrl={post.image_url}
          initialCategoryId={post.category_id}
          initialPostType={post.post_type}
          initialSlug={post.slug}
        />
      </div>
    </main>
  );
}
