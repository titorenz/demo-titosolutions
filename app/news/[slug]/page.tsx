import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import { NewsPost as NewsPostComponent } from "@/components/news/news-post";
import { RecentPosts } from "@/components/news/recent-posts";
import { SearchBar } from "@/components/blogs/search-bar";
import { notFound } from "next/navigation";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { NewsCategories } from "@/components/news/news-categories";
import { fetchPost, fetchRecentPosts } from "@/lib/posts";
import { Metadata } from "next";
import { sharedMetadata } from "@/app/shared-metadata";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const { data: post } = await fetchPost({ slug: params.slug });

  return {
    ...sharedMetadata,
    title: post?.title || "Latest News and Updates | Tito Solutions",
    description:
      post?.excerpt ||
      "Stay updated with the latest news, announcements, and insights from Tito Solutions. Read our latest articles and company updates.",
  };
};

export default async function NewsPost(props: {
  params: Promise<{ slug: string; search?: string }>;
}) {
  const params = await props.params;

  if (!params.slug) {
    notFound(); // Redirect to 404 if slug is missing
  }

  const searchQuery = params.search || "";

  const recentPosts = await fetchRecentPosts("news");

  const { data: post, error } = await fetchPost({
    slug: params.slug,
  });

  if (error || !post) {
    notFound(); // Redirect to 404 if post not found
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
