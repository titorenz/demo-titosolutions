import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessStory {
  title: string;
  image: string;
  link: string;
}

const successStories: SuccessStory[] = [
  {
    title: "Mommyki The SUPER Pet App",
    image: "/placeholder.svg",
    link: "portfolio/slug",
  },
  {
    title: "Liberte",
    image: "/placeholder.svg",
    link: "portfolio/slug",
  },
  {
    title: "Taxmate",
    image: "/placeholder.svg",
    link: "portfolio/slug",
  },
  {
    title: "Grow Group App",
    image: "/placeholder.svg",
    link: "portfolio/slug",
  },
  {
    title: "Paygr",
    image: "/placeholder.svg",
    link: "portfolio/slug",
  },
  {
    title: "Tax Plan Experts & Tax Maverick",
    image: "/placeholder.svg",
    link: "portfolio/slug",
  },
];

export default function SuccessStories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {successStories.map((story, index) => (
        <Card
          key={index}
          className="group cursor-pointer border-none shadow-none"
        >
          <CardContent className="p-0">
            <a href={story.link} className="block">
              <div className="relative aspect-square">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover shadow-lg rounded-lg"
                />
              </div>
              <div className="pr-6 py-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold group-hover:text-[#85d54a]">
                  {story.title}
                </h3>
                <ChevronRight className="w-10 h-10 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
