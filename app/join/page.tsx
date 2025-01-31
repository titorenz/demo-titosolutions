import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { Metadata } from "next";
import { sharedMetadata } from "../shared-metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Join Our Team | Tito Solutions - Career Opportunities",
  description:
    "Explore exciting career opportunities at Tito Solutions. Join our dynamic team and be part of innovative technology solutions. Find your next career move with us.",
};

export default function Blogs() {
  return (
    <>
      <Header />
      <div className="w-full h-16 bg-[#012241]" />
      <iframe
        src="https://www.careers-page.com/tito-solutions-philippines-inc"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
      />
      <Footer />
    </>
  );
}
