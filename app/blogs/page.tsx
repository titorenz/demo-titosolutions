import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import { BlogCategories } from "@/components/blogs/blog-categories";
import { BlogCard } from "@/components/blogs/blog-card";
import { Pagination } from "@/components/blogs/pagination";
import { SearchBar } from "@/components/blogs/search-bar";
import { RecentPosts } from "@/components/blogs/recent-posts";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { fetchRecentPosts, fetchPosts } from "@/lib/posts";
import { Metadata } from "next";
import { sharedMetadata } from "../shared-metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Tito Solutions Blogs - Expert Insights & Technology Updates",
  description:
    "Explore our collection of expert blogs covering technology solutions, industry insights, and innovative best practices. Stay informed with Tito Solutions' latest articles and updates.",
};

const POSTS_PER_PAGE = 6;

export default async function Blogs(props: {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}) {
  const breadcrumbPaths = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Our Blogs" },
  ];

  const searchParams = await props.searchParams;
  const categoryId = searchParams.category
    ? parseInt(searchParams.category)
    : undefined;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const searchQuery = searchParams.search || "";

  const recentPosts = await fetchRecentPosts("blogs");

  const { data: allPosts, count } = await fetchPosts({
    postType: "blogs",
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
              Our Blogs
            </h1>
            <Breadcrumb paths={breadcrumbPaths} />
          </div>

          <div className="container max-w-7xl mx-auto px-4 py-8 sm:mt-[12em] mt-16">
            <div className="sm:hidden block mb-6">
              <SearchBar initialQuery={searchQuery} postType="blogs" />
            </div>
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="lg:flex-1">
                {allPosts && allPosts.length > 0 ? (
                  <div className="grid gap-8 sm:grid-cols-2">
                    <BlogCard posts={allPosts} />
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    No blogs available at the moment.
                  </div>
                )}
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/blogs"
                    categoryId={categoryId ? categoryId.toString() : undefined}
                  />
                </div>
              </div>
              <aside className="w-full lg:w-96 space-y-4">
                <div className="sm:block hidden space-y-4">
                  <SearchBar initialQuery={searchQuery} postType="blogs" />
                  <BlogCategories />
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
