import { supabase } from "@/lib/supabase";

export async function fetchRecentPosts(postType: string, limit = 3) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, image_url, created_at")
    .eq("post_type", postType)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }

  return data;
}

export async function fetchPosts({
  postType,
  categoryId,
  searchQuery,
  page,
  postsPerPage,
}: {
  postType: string;
  categoryId?: number;
  searchQuery?: string;
  page: number;
  postsPerPage: number;
}) {
  const offset = (page - 1) * postsPerPage;

  let query = supabase
    .from("posts")
    .select(
      "id, title, content, image_url, created_at, post_type, categories(name)",
      { count: "exact" }
    )
    .eq("post_type", postType)
    .order("created_at", { ascending: false })
    .range(offset, offset + postsPerPage - 1);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
    return { data: [], count: 0 };
  }

  return { data, count };
}

export async function fetchPost({ slug }: { slug: string }) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, categories(name)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return { data: null, error };
  }

  if (!post) {
    return { data: null, error: "Post not found" };
  }

  return { data: post, error: null };
}
