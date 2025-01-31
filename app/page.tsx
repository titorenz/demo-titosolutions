import Hero from "@/components/home/hero";
import Journey from "@/components/home/journey";
import Engagements from "@/components/home/engagements";
import Founders from "@/components/home/founders";
import CallToAction from "@/components/home/call-to-action";
import Feedback from "@/components/home/feedback";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { Metadata } from "next";
import { sharedMetadata } from "./shared-metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "TITO Solutions | Digital Innovation & Cloud Solutions",
  description:
    "Transform your business with TITO Solutions. We deliver cutting-edge digital innovation, cloud solutions, and expert IT consulting services to drive your business forward.",
};

export default function Home() {
  return (
    <div className="font-montserrat">
      <Header />
      <Hero />
      <Journey />
      <Engagements />
      <Founders />
      <CallToAction />
      <Feedback />
      <Footer />
    </div>
  );
}
