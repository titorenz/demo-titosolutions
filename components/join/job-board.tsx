import { JobCard } from "./job-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const jobs = [
  {
    title: "Senior Backend Developer",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Delivery",
    type: "Full-time",
    location: "Philippines",
    salary: "Php 50,000",
    workspace: "Remote",
    postedDate: "December 31, 2028",
  },
  {
    title: "Social Media Manager",
    rating: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Growth",
    type: "Full-time",
    location: "Philippines",
    salary: "Php 50,000",
    workspace: "Remote",
    postedDate: "May 1, 2028",
  },
  {
    title: "iOS Developer",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Delivery",
    type: "Full-time",
    location: "Philippines",
    salary: "Php 50,000",
    workspace: "Remote",
    postedDate: "December 31, 2028",
  },
  {
    title: "Video Editor",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Delivery",
    type: "Full-time",
    location: "Philippines",
    salary: "Php 50,000",
    workspace: "Remote",
    postedDate: "December 31, 2028",
    applyButtonVariant: "success" as const,
  },
  {
    title: "Junior QA Engineer",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Laboratory",
    type: "Full-time",
    location: "Philippines",
    salary: "Php 50,000",
    workspace: "Remote",
    postedDate: "December 31, 2028",
  },
  {
    title: "Scrum Master",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Delivery",
    type: "Full-time",
    location: "Philippines",
    salary: "Php 50,000",
    workspace: "Remote",
    postedDate: "December 31, 2028",
  },
];

export default function JobBoard() {
  return (
    <div className="container mx-auto sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        <Button variant="outline_secondary" size="icon" className="w-8 h-8">
          <span className="sr-only">Previous page</span>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline_secondary" size="icon" className="w-8 h-8">
          1
        </Button>
        <Button variant="outline_secondary" size="icon" className="w-8 h-8">
          2
        </Button>
        <Button variant="outline_secondary" size="icon" className="w-8 h-8">
          3
        </Button>
        <Button variant="outline_secondary" size="icon" className="w-8 h-8">
          <span className="sr-only">Next page</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
