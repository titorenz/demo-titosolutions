import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Engagements() {
  return (
    <div className="w-full bg-white md:py-20 py-6">
      <div className="md:w-[75%] w-[90%] mx-auto bg-[#012241] sm:rounded-[2em] rounded-2xl overflow-hidden">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 grid-cols-1 items-center">
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src="/landing-page/professional.svg"
                alt="Professional"
                fill
                className="object-cover object-left"
                priority
              />
            </div>

            <div className="p-6 md:p-8 lg:p-12 md:space-y-12 space-y-6 col-span-2">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                &#39;We <span className="italic">crave</span> building solutions
                that impact people .&#39;
              </h1>

              <div className="grid grid-cols-3 gap-8">
                {[
                  { value: 500, suffix: "+", label: "End Users Impacted" },
                  { value: 30, suffix: "+", label: "Project Experience" },
                  { value: 2, suffix: "", label: "Startups Co-Founded" },
                  { value: 100, suffix: "+", label: "End Users Impacted" },
                  { value: 200, suffix: "+", label: "Project Experience" },
                  { value: 300, suffix: "", label: "Startups Co-Founded" },
                ].map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-[#85d54a] text-3xl md:text-4xl lg:text-7xl font-bold">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-2xl md:text-3xl lg:text-4xl">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="text-white text-sm font-thin md:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-10 px-4 md:px-0 md:py-20 py-10">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center">
          Our Engagements
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-3xl w-full mx-auto gap-4 md:gap-6">
          {[
            {
              id: 1,
              title: "Team-Based Engagement",
              description:
                "Collaborative and flexible approach to product development with a dedicated team of experts.",
            },
            {
              id: 2,
              title: "App Development",
              description:
                "Fixed contract engagement for well-defined projects, ensuring clear timelines, deliverables, and costs.",
            },
            {
              id: 3,
              title: "Social Media Growth Team",
              description:
                "A team of dedicated marketing experts with the sole purpose of growing your presence online. ",
            },
          ].map((item) => (
            <Card
              key={item.id}
              className="relative h-[250px] md:h-[300px] w-full bg-[#F1F8FF] border-none hover:bg-[#85D64A] hover:text-white transition-all duration-300"
            >
              <CardContent className="h-full flex flex-col p-4 md:p-6">
                <h1 className="text-lg font-bold">0{item.id}</h1>
                <hr className="w-full h-[2px] bg-gray-300 my-2" />
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm mt-2 md:mt-4">{item.description}</p>
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10 mt-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
