import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import { Pagination } from "@/components/blogs/pagination";
import { SearchBar } from "@/components/blogs/search-bar";
import { RecentPosts } from "@/components/news/recent-posts";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { NewsCategories } from "@/components/news/news-categories";
import { NewsCard } from "@/components/news/news-card";
import { fetchPosts, fetchRecentPosts } from "@/lib/posts";

const POSTS_PER_PAGE = 6;

export default async function News(props: {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}) {
  const breadcrumbPaths = [
    { href: "/", label: "Home" },
    { href: "/news", label: "Our News" },
  ];

  const searchParams = await props.searchParams;
  const categoryId = searchParams.category
    ? parseInt(searchParams.category)
    : undefined;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const searchQuery = searchParams.search || "";

  const recentPosts = await fetchRecentPosts("news");

  const { data: allPosts, count } = await fetchPosts({
    postType: "news",
    categoryId,
    searchQuery,
    page: currentPage,
    postsPerPage: POSTS_PER_PAGE,
  });

  const totalPages = count ? Math.ceil(count / POSTS_PER_PAGE) : 0;

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
            <h1 className="text-4xl sm:text-7xl font-bold text-[#85d54a]">
              Our News
            </h1>
            <Breadcrumb paths={breadcrumbPaths} />
          </div>

          <div className="container max-w-7xl mx-auto px-4 py-8 sm:mt-[12em] mt-16">
            <div className="sm:hidden block mb-6">
              <SearchBar initialQuery={searchQuery} postType="news" />
            </div>
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="lg:flex-1">
                {allPosts && allPosts.length > 0 ? (
                  <div className="grid gap-8 sm:grid-cols-2">
                    <NewsCard posts={allPosts} />
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    No news posts available at the moment.
                  </div>
                )}
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/news"
                    categoryId={categoryId ? categoryId.toString() : undefined}
                  />
                </div>
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
