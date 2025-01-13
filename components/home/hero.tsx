import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface PortfolioLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

const portfolioLogos: PortfolioLogo[] = [
  {
    src: "/landing-page/portfolios/tax-maverick-logo.png",
    alt: "Tax Maverick",
    width: 100,
    height: 100,
    className: "",
  },
  {
    src: "/landing-page/portfolios/liberte-logo.png",
    alt: "Liberte",
    width: 60,
    height: 60,
    className: "",
  },
  {
    src: "/landing-page/portfolios/taxmate-logo.png",
    alt: "Taxmate",
    width: 100,
    height: 100,
    className: "invert brightness-0",
  },
  {
    src: "/landing-page/portfolios/tax-plan-experts-logo.png",
    alt: "Tax Plan Experts",
    width: 70,
    height: 70,
    className: "",
  },
  {
    src: "/landing-page/portfolios/gani-table-logo.png",
    alt: "Gani Table",
    width: 100,
    height: 100,
    className: "",
  },
];

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white sm:rounded-b-[2em] rounded-b-2xl">
      <div className="absolute inset-0">
        <Image
          className="object-none"
          src="/background.svg"
          alt="Background"
          fill
          priority
        />
      </div>

      <div className="relative z-40 flex flex-col items-center justify-center sm:pt-20 pt-10 pb-14 px-4 sm:mt-20 mt-12">
        <h1 className="text-center sm:text-7xl text-3xl font-bold text-[#85d54a] sm:mb-10 mb-5">
          Break barriers <br /> through impactful tech.
        </h1>
        <p className="font-poppins text-center sm:text-xl text-sm text-gray-100 tracking-widest sm:mb-10 mb-5">
          Software Development | Mobile App Development | Website Development |
          Social Media Growth Team
        </p>
        <Button className="rounded-full bg-[#85d54a] hover:bg-[#85d54a]/80 text-white px-10">
          <Link href="https://www.talk2tito.solutions/" target="_blank">
            Let&apos;s talk
          </Link>
        </Button>
        <Image
          className="py-12"
          src="/landing-page/dashboard.png"
          alt="Dashboard"
          width={1000}
          height={1000}
        />

        <div className="h-[1px] max-w-[50%] w-full bg-gray-100" />

        <p className="text-center text-sm text-gray-100 tracking-widest sm:my-10 my-5">
          Trusted Partner for Startups
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-6 sm:gap-6 md:gap-8 lg:gap-10 px-4">
          {portfolioLogos.map((logo) => (
            <div
              key={logo.alt}
              className="w-[calc(33.33%-1rem)] sm:w-auto flex justify-center items-center"
            >
              <Image
                className={`w-auto h-auto scale-75 sm:scale-90 md:scale-100 ${logo.className}`}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
