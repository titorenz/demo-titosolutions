import Image from "next/image";

interface Founder {
  name: string;
  role: string;
  description: string;
  image: string;
}

const founders: Founder[] = [
  {
    name: "Kyle Imperio",
    role: "CEO",
    description:
      "A visionary leader with a passion for innovation, Kyle spearheads Tito Solutions with a focus on delivering value and driving growth.",
    image: "/landing-page/founders/kyle.jpeg",
  },
  {
    name: "Jimmy Melo",
    role: "COO",
    description:
      "With over a decade of experience in project management, Jimmy ensures the successful delivery of projects and operations.",
    image: "/landing-page/founders/jimmy.jpeg",
  },
  {
    name: "Eleazer Toluan",
    role: "CTO",
    description:
      "As our chief technology officer, Eleazer drives technological innovation and excellence in web and mobile app development.",
    image: "/landing-page/founders/zer.jpeg",
  },
  {
    name: "Eliakim Toluan",
    role: "CIO",
    description:
      "Leading our technology initiatives, Eliakim pioneers the adoption of cutting-edge tools and techniques to deliver superior solutions.",
    image: "/landing-page/founders/kim.jpeg",
  },
  {
    name: "Jasper Iturriaga",
    role: "CMO",
    description:
      "Jasper, a filmmaker, storyteller, and humanitarian from the Philippines, spearheads brand awareness to international audiences expanding the portfolio of the company.",
    image: "/landing-page/founders/jasper.jpeg",
  },
];

export default function Founders() {
  return (
    <section className="pb-16 px-4 max-w-8xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-16">
        Meet the Founders
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {founders.map((founder) => (
          <div
            key={founder.name}
            className="flex flex-col items-center text-center mb-8 lg:mb-0"
          >
            <div className="relative w-48 h-48 mb-4">
              <div className="rounded-full p-1 border border-[#85d54a]">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={192}
                  height={192}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold">{founder.name}</h2>
            <p className="text-gray-500 mb-4">{founder.role}</p>
            <p className="text-gray-600 text-sm leading-relaxed max-w-[15em]">
              {founder.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
