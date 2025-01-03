import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import GetConnected from "@/components/portfolio/get-connected";
import PortfolioPost from "@/components/portfolio/portfolio-post";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

export default async function OurStories(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params?.slug as string;

  const breadcrumbPaths = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Our Portfolio" },
    { href: `/portfolio/${slug}`, label: "Our Stories" },
  ];

  const post = {
    title: "Enjoy Hussle-free BIR Tax Compliance",
    image: "/placeholder.svg",
    projectDetails: [
      { label: "Client", value: "Taxmate" },
      { label: "Services", value: "Mobile App" },
      { label: "Duration", value: "2 Months" },
      { label: "Website", value: "Live Preview" },
    ],
    projectOverview: {
      image: "/placeholder.svg",
      title: "Project Overview",
      description: "Something special is coming to 8% taxpayers.",
      content: {
        list: [
          {
            title: "Professionals",
            description:
              "Perfect filling app for doctors, dentists, lawyers, and other service professionals.",
          },
          {
            title: "Self-Employed or Solopreneurs",
            description:
              "Online sellers and financial advisors can focus on building their network and business.",
          },
          {
            title: "Micro Businesses",
            description:
              "Small business owners will more time to improve their services and products.",
          },
        ],
      },
    },
    projectResults: {
      image: "/placeholder.svg",
      title: "Project Results",
      description: "Something special is coming to 8% taxpayers.",
      content: {
        list: [
          {
            title: "Professionals",
            description:
              "Perfect filling app for doctors, dentists, lawyers, and other service professionals.",
          },
          {
            title: "Self-Employed or Solopreneurs",
            description:
              "Online sellers and financial advisors can focus on building their network and business.",
          },
        ],
      },
    },
  };

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
              <PortfolioPost post={post} />
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
