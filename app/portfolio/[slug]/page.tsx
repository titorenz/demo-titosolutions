import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import GetConnected from "@/components/portfolio/get-connected";
import PortfolioPost from "@/components/portfolio/portfolio-post";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { sharedMetadata } from "@/app/shared-metadata";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", params.slug)
    .single();

  return {
    ...sharedMetadata,
    title:
      post?.title || "Our Stories | Tito Solutions - IT Solutions Provider",
    description:
      post?.excerpt ||
      "Explore our portfolio of successful IT projects and solutions. Read detailed case studies about how we help businesses transform through technology.",
  };
}

export default async function OurStories(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params?.slug as string;

  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !portfolio) {
    throw new Error("Portfolio not found");
  }

  const breadcrumbPaths = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Our Portfolio" },
    { href: `/portfolio/${slug}`, label: "Our Stories" },
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
              Our Stories
            </h1>

            <Breadcrumb paths={breadcrumbPaths} />
          </div>

          <div className="container max-w-7xl mx-auto px-4 py-8 sm:mt-[12em] mt-16">
            <div className="flex flex-col gap-8">
              <PortfolioPost post={portfolio} />
              <Separator />

              <section className="w-full flex flex-col gap-8 lg:gap-0 lg:flex-row px-0 sm:px-6">
                <GetConnected />
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
