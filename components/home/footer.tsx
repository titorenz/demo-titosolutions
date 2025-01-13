import Image from "next/image";
import Link from "next/link";
import { NavigationLinks } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="font-montserrat relative w-full py-4 md:py-6">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/background.svg"
          alt="Footer background"
          fill
          className="object-none sm:rounded-t-[2em] rounded-t-2xl"
          priority
        />
      </div>

      <div className="relative flex flex-col">
        <div className="w-full mt-4 md:mt-12">
          <Image
            src="/landing-page/Pattern.svg"
            className="opacity-50 w-full "
            alt="Pattern"
            width={1920}
            height={1792}
          />
        </div>

        <div className="container relative mx-auto px-4 py-8 md:py-20 mt-6 md:mt-20 mb-8">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[95%] h-[1px] bg-gray-400" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-20">
            <div className="space-y-6 md:ml-6">
              <div className="flex justify-center md:justify-start">
                <Link href="/">
                  <Image
                    src="/tito-solutions-logo.svg"
                    alt="Tito Solutions Logo"
                    width={130}
                    height={130}
                    className="w-40 md:w-[180px]"
                  />
                </Link>
              </div>
              <p className="text-sm text-gray-300 max-w-sm mx-auto md:mx-0 text-center md:text-left">
                We help people and businesses materialize their tech ideas. With
                our 40+ combined years of experience in software development and
                helping startups scale up, we can help you automate your
                business processes or enable you to bring a tech product to
                life.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="hidden md:block h-[55.91px]" />
              <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-20 text-gray-100 text-sm md:mr-12">
                {NavigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-gray-300 transition-colors px-2 py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[95%] h-[1px] bg-gray-400" />
        </div>

        <p className="text-center text-sm text-gray-300 px-4 md:px-10 pb-4">
          Copyright &copy; {new Date().getFullYear()} Tito Solutions
          Philippines, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
