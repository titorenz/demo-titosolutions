import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/lib/types";
import { Portfolio } from "@/lib/types";
import Link from "next/link";

export default function PortfolioPost({ post }: { post: Portfolio }) {
  const projectDetails = [
    { label: post.client, value: post.client_value },
    { label: post.services, value: post.services_value },
    { label: post.duration, value: post.duration_value },
    {
      label: post.website,
      value: (
        <Link
          href={post.website_value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#85d54a]"
        >
          Preview
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="w-full space-y-6 sm:space-y-16 mb-4">
        <h1 className="text-4xl text-center sm:text-left sm:text-6xl font-bold max-w-2xl">
          {post.title}
        </h1>
        <Image
          className="w-full h-[13em] sm:h-[35em] object-cover rounded-xl shadow-xl"
          src={post.cover_image}
          alt={post.title}
          width={1080}
          height={350}
        />

        <div className="w-full flex sm:flex-row flex-col justify-between">
          {projectDetails.map((detail, index) => (
            <div
              key={index}
              className="flex flex-row items-center sm:items-baseline sm:flex-col gap-3"
            >
              <p>{detail.label}:</p>
              <h1 className="text-xl my-2 sm:text-2xl font-semibold sm:font-bold">
                {detail.value}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-6 sm:mt-10 mb-10 sm:mb-20">
        <div>
          <Image
            className="w-full h-[20em] sm:h-[28em] object-cover rounded-xl"
            src={post.overview_image}
            alt={post.overview_title}
            width={1080}
            height={350}
          />
        </div>
        <div className="space-y-4 sm:space-y-8 py-2 sm:py-4">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
            {post.overview_title}
          </h1>
          <h2 className="text-lg sm:text-xl font-bold">
            {post.overview_description}
          </h2>

          <ul className="list-disc pl-4 sm:pl-6 space-y-3 sm:space-y-4">
            {post.additional_sections.map((section: Section, index: number) => (
              <li key={index}>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {section.title}
                </h3>
                <p className="text-sm sm:text-base">{section.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-8 py-2 sm:py-4">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
            {post.project_results_title}
          </h1>
          <h2 className="text-lg sm:text-xl font-bold">
            {post.project_results_description}
          </h2>

          <ul className="list-disc pl-4 sm:pl-6 space-y-3 sm:space-y-4">
            {post.project_results_sections.map(
              (section: Section, index: number) => (
                <li key={index}>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {section.title}
                  </h3>
                  <p className="text-sm sm:text-base">{section.text}</p>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <Image
            className="w-full h-[16em] sm:h-[22em] object-cover rounded-xl"
            src={post.project_results_image}
            alt={post.project_results_title}
            width={1080}
            height={350}
          />
        </div>
      </div>
    </>
  );
}
