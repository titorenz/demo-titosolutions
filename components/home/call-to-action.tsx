import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-[#012241] relative overflow-hidden flex flex-col md:flex-row items-center justify-center py-10 md:gap-[10em] gap-6">
      <div className="max-w-7xl relative z-10 text-center md:text-left">
        <div className="max-w-2xl">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
            Talk to our Team!
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Our team is ready to talk and eager to provide solutions to your
            challenges!
          </p>
          <Button className="bg-[#7AC943] hover:bg-[#68AB39] text-white rounded-full px-8 md:px-12 py-4 text-lg font-semibold">
            <Link href="https://www.talk2tito.solutions/" target="_blank">
              Let&apos;s Talk!
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src="/tito-solutions-icon.svg"
          alt="Logo"
          width={300}
          height={300}
          priority
          className="w-48 h-48 md:w-96 md:h-96"
        />
      </div>
    </section>
  );
}
