import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { truncateTexts } from "@/lib/utils";

interface Engagement {
  id: number;
  value: string;
  suffix: string;
  label: string;
}

export default async function Engagements() {
  const { data: engagements, error } = await supabase
    .from("engagements")
    .select("*")
    .order("id");

  if (error) {
    console.error("Error fetching engagements:", error);
  }

  return (
    <div className="w-full bg-white md:py-20 py-6">
      <div className="md:w-[75%] w-[90%] mx-auto bg-[#012241] sm:rounded-[2em] rounded-2xl overflow-hidden">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 grid-cols-1 items-center">
            <div className="relative sm:h-full h-[200px]">
              <Image
                src="/landing-page/professional-women.jpg"
                alt="Professional"
                fill
                className="object-cover sm:object-center object-top"
                priority
              />
            </div>

            <div className="p-6 md:p-8 lg:p-12 md:space-y-12 space-y-6 col-span-2">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                &#39;We <span className="italic">crave</span> building solutions
                that impact people .&#39;
              </h1>

              <div className="grid grid-cols-3 gap-8">
                {engagements?.map((engagement: Engagement) => (
                  <div
                    key={engagement.id}
                    className="flex flex-col items-center"
                  >
                    <div className="text-[#85d54a] text-3xl md:text-4xl lg:text-6xl font-bold">
                      {engagement.value}
                      {engagement.suffix && (
                        <span className="text-2xl md:text-3xl lg:text-4xl">
                          {engagement.suffix}
                        </span>
                      )}
                    </div>
                    <p className="sm:inline hidden text-white text-sm text-center font-normal md:text-base">
                      {engagement.label}
                    </p>
                    <p className="inline sm:hidden text-white text-sm text-center font-normal md:text-base">
                      {truncateTexts(engagement.label, 18)}
                    </p>
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
              className="relative h-[250px] md:h-[300px] w-full bg-[#F1F8FF] border-none hover:bg-[#62ab2e] hover:text-white transition-all duration-300"
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
