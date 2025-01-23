import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, LucideIcon } from "lucide-react";

type ContactInfo = {
  icon: LucideIcon;
  text: string;
  href: string;
  ariaLabel: string;
};

const contactItems: ContactInfo[] = [
  {
    icon: Globe,
    text: "www.talk2tito.solutions",
    href: "https://www.talk2tito.solutions/",
    ariaLabel: "Visit our website",
  },
  {
    icon: Mail,
    text: "info@titosolutions.ph",
    href: "mailto:info@titosolutions.ph",
    ariaLabel: "Send us an email",
  },
  // {
  //   icon: Phone,
  //   text: "(63) 917 888 8888",
  //   href: "/",
  //   ariaLabel: "Call us",
  // },
];

export default function PortfolioPost() {
  return (
    <>
      <div className="w-full">
        <Image
          className="w-full h-[240px] sm:h-[400px] lg:h-[28em] object-cover rounded-xl"
          src="/portfolio/office-mockup.png"
          alt="Story"
          width={1080}
          height={350}
          priority
        />
      </div>
      <div className="w-full lg:w-1/2 lg:pl-16 flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Let&apos;s get connected.
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg">
          Let&apos;s get in touch so we can help you get your project started.
        </p>
        <div className="flex flex-col gap-4 mt-8 sm:mt-12">
          {contactItems.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              target="_blank"
              className="flex gap-4 group items-center"
              aria-label={item.ariaLabel}
            >
              <item.icon className="w-6 h-6 sm:w-7 sm:h-7 p-1 bg-[#85da54] rounded-full text-white" />
              <p className="text-lg sm:text-xl font-semibold group-hover:text-[#85da54]">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
