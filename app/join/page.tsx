import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

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
