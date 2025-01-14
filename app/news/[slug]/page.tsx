import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import { NewsPost as NewsPostComponent } from "@/components/news/news-post";
import { RecentPosts } from "@/components/news/recent-posts";
import { SearchBar } from "@/components/blogs/search-bar";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { NewsCategories } from "@/components/news/news-categories";

export default async function NewsPost(props: {
  params: Promise<{ slug: string; search?: string }>;
}) {
  const params = await props.params;
  const searchQuery = params.search || "";

  const { data: recentPosts } = await supabase
    .from("posts")
    .select("id, title, image_url, created_at, slug")
    .eq("post_type", "news")
    .order("created_at", { ascending: false })
    .limit(3);

  const { data: post, error } = await supabase
    .from("posts")
    .select("*, categories(name)")
    .eq("slug", params.slug)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const postsQuery = supabase
    .from("posts")
    .select(
      "id, title, content, image_url, created_at, slug, post_type, categories(name)",
      { count: "exact" }
    )
    .eq("post_type", "news")
    .order("created_at", { ascending: false });

  if (searchQuery) {
    postsQuery.ilike("title", `%${searchQuery}%`);
  }

  const breadcrumbPaths = [
    { href: "/", label: "Home" },
    { href: "/news", label: "News" },
    { href: `/news/${post.id}`, label: "News Post" },
  ];

  return (
    <>
      <Header />
      <div className="font-montserrat relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            className="h-[250px] sm:h-[350px] w-full sm:rounded-b-[2em] rounded-b-2xl object-none"
            src="/background.svg"
            alt="Cover"
            width={1080}
            height={350}
          />
        </div>

        <div className="relative z-40 flex flex-col items-center justify-center h-full sm:py-16 py-8">
          <div className="sm:mt-10 mt-16 flex flex-col items-center justify-center sm:space-y-12 space-y-8">
            <h1 className="text-4xl sm:text-7xl font-bold text-[#85d54a] text-center">
              News Post
            </h1>

            <Breadcrumb paths={breadcrumbPaths} />
          </div>

          <div className="container max-w-7xl mx-auto px-4 py-8 sm:mt-[12em] mt-16">
            <div className="sm:hidden block mb-6">
              <SearchBar initialQuery={searchQuery} postType="news" />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:flex-1">
                <NewsPostComponent post={post} />
              </div>
              <aside className="w-full lg:w-96 space-y-4">
                <div className="sm:block hidden space-y-4">
                  <SearchBar initialQuery={searchQuery} postType="news" />
                  <NewsCategories />
                  <RecentPosts posts={recentPosts || []} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
