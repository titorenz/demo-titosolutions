import AuthCheck from "@/components/content-manager/AuthCheck";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import PostGrid from "@/components/content-manager/PostGrid";
import { Pagination } from "@/components/content-manager/Pagination";
import { SearchBar } from "@/components/content-manager/SearchBar";

export const dynamic = "force-dynamic";

const POSTS_PER_PAGE = 6;

export default async function NewsPage(props: {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;

  const categoryId = searchParams.category;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const searchQuery = searchParams.search || "";

  // Fetch categories with post counts
  const { data: categoriesWithCounts } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      posts:posts(count)
    `
    )
    .eq("type", "news")
    .order("name");

  const categories =
    categoriesWithCounts?.map((category) => ({
      ...category,
      postCount: category.posts[0].count,
    })) || [];

  const postsQuery = supabase
    .from("posts")
    .select(
      "id, title, content, image_url, created_at, post_type, categories(name)",
      { count: "exact" }
    )
    .eq("post_type", "news")
    .order("created_at", { ascending: false });

  if (categoryId) {
    postsQuery.eq("category_id", categoryId);
  }

  if (searchQuery) {
    postsQuery.ilike("title", `%${searchQuery}%`);
  }

  const { data: allPosts, error: countError, count } = await postsQuery;

  if (countError) {
    console.error("Error fetching news:", countError);
    return <div>Error loading news</div>;
  }

  const totalPages = count ? Math.ceil(count / POSTS_PER_PAGE) : 0;

  const paginatedPosts = allPosts?.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Get the total post count
  const { count: totalPostCount } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("post_type", "news");

  return (
    <AuthCheck>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">News</h1>
          <Link href="/content-manager/create" passHref>
            <Button>Create New Post</Button>
          </Link>
        </div>
        <div className="mb-8">
          <SearchBar initialQuery={searchQuery} postType="news" />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/content-manager/news" passHref>
              <Button variant={categoryId ? "outline" : "default"}>
                All ({totalPostCount})
              </Button>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/content-manager/news?category=${category.id}`}
                passHref
              >
                <Button
                  variant={
                    categoryId === category.id.toString()
                      ? "default"
                      : "outline"
                  }
                >
                  {category.name} ({category.postCount})
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <PostGrid posts={paginatedPosts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/content-manager/news"
          categoryId={categoryId}
        />
      </main>
    </AuthCheck>
  );
}
