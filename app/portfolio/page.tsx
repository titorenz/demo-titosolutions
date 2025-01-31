import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import SuccessStories from "@/components/portfolio/success-stories";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { Metadata } from "next";
import { sharedMetadata } from "../shared-metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Our Portfolio | Success Stories and Case Studies | TITO Solutions",
  description:
    "Explore our portfolio of successful digital transformations and IT solutions. See how we've helped businesses achieve their goals through innovative technology solutions.",
};

export default function Portfolio() {
  const breadcrumbPaths = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Our Portfolio" },
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
              Our Portfolio
            </h1>
            <Breadcrumb paths={breadcrumbPaths} />
          </div>

          <div className="container max-w-7xl mx-auto px-4 py-8 sm:mt-[12em] mt-16">
            <h2 className="sm:text-7xl text-4xl font-bold text-center mb-12 max-w-3xl mx-auto">
              Explore some of our success stories
            </h2>
            <SuccessStories />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
