import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TbMapPinFilled } from "react-icons/tb";
import { FaWallet, FaBuilding } from "react-icons/fa";

interface JobCardProps {
  title: string;
  rating: number;
  description: string;
  category: string;
  type: string;
  location: string;
  salary: string;
  workspace: string;
  postedDate: string;
}

export function JobCard({
  title,
  rating,
  description,
  category,
  type,
  location,
  salary,
  workspace,
  postedDate,
}: JobCardProps) {
  const gridItems = [
    {
      icon: <TbMapPinFilled className="w-4 h-4 text-gray-600" />,
      label: "Location",
      value: location,
    },
    {
      icon: <FaWallet className="w-4 h-4 text-gray-600" />,
      label: "Salary",
      value: salary,
    },
    {
      icon: <FaBuilding className="w-4 h-4 text-gray-600" />,
      label: "Workspace",
      value: workspace,
    },
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">({rating}/5)</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#012241]">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>

          <div className="flex items-center gap-2 text-md font-semibold text-[#85d54a]">
            <span className=" uppercase">{category}</span>
            <span>•</span>
            <span className="uppercase">{type}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-b py-6">
            {gridItems.map((item, index) => (
              <div key={index} className="flex flex-col">
                <span className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase">
                  {item.icon}
                  {item.label}
                </span>
                <span className="text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-muted-foreground">
              Posted: {postedDate}
            </span>
            <Button className="bg-[#012241] hover:bg-[#85d54a]/90 rounded-full">
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
