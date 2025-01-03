import Image from "next/image";
import { Separator } from "@/components/ui/separator";

type PortfolioPostProps = {
  title: string;
  image: string;
  projectDetails: {
    label: string;
    value: string;
  }[];
  projectOverview: {
    image: string;
    title: string;
    description: string;
    content: {
      list: {
        title: string;
        description: string;
      }[];
    };
  };
  projectResults: {
    image: string;
    title: string;
    description: string;
    content: {
      list: {
        title: string;
        description: string;
      }[];
    };
  };
};

export default function PortfolioPost({ post }: { post: PortfolioPostProps }) {
  return (
    <>
      <div className="w-full space-y-6 sm:space-y-16 mb-8">
        <h1 className="text-4xl text-center sm:text-left sm:text-6xl font-bold max-w-2xl">
          {post.title}
        </h1>
        <Image
          className="w-full h-[13em] sm:h-[35em] object-cover rounded-xl shadow-xl"
          src={post.image}
          alt={post.image}
          width={1080}
          height={350}
        />

        <div className="w-full flex sm:flex-row flex-col justify-between">
          {post.projectDetails.map((detail, index) => (
            <div
              key={index}
              className="flex flex-row items-center sm:items-baseline sm:flex-col gap-2"
            >
              <p>{detail.label}:</p>
              <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold">
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
            src={post.projectOverview.image}
            alt={post.projectOverview.image}
            width={1080}
            height={350}
          />
        </div>
        <div className="space-y-4 sm:space-y-8 py-2 sm:py-4">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
            {post.projectOverview.title}
          </h1>
          <h2 className="text-lg sm:text-xl font-bold">
            {post.projectOverview.description}
          </h2>

          <ul className="list-disc pl-4 sm:pl-6 space-y-3 sm:space-y-4">
            {post.projectOverview.content.list.map((item, index) => (
              <li key={index}>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-8 py-2 sm:py-4">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
            {post.projectResults.title}
          </h1>
          <h2 className="text-lg sm:text-xl font-bold">
            {post.projectResults.description}
          </h2>

          <ul className="list-disc pl-4 sm:pl-6 space-y-3 sm:space-y-4">
            {post.projectResults.content.list.map((item, index) => (
              <li key={index}>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Image
            className="w-full h-[16em] sm:h-[22em] object-cover rounded-xl"
            src={post.projectResults.image}
            alt={post.projectResults.image}
            width={1080}
            height={350}
          />
        </div>
      </div>
    </>
  );
}
