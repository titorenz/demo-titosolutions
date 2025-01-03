import Image from "next/image";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

interface NewsPostProps {
  image: string;
  title: string;
  date: string;
  category: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      image?: string;
    }[];
    keyTakeawaysTitle: string;
    keyTakeaways: string[];
    conclusion: string;
  };
}

export function NewsPost({ post }: { post: NewsPostProps }) {
  return (
    <article className="space-y-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={post.image}
          alt="Featured image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-md font-semibold">
          <span className="text-primary hover:underline cursor-pointer">
            {post.category}
          </span>
          <span className="text-muted-foreground">•</span>
          <time className="text-muted-foreground hover:text-[#85d54a] cursor-default">
            {formatDate(post.date)}
          </time>
        </div>
        <h1 className="text-3xl font-bold lg:text-4xl">{post.title}</h1>
        <p className="text-lg text-muted-foreground">
          {post.content.introduction}
        </p>
      </div>

      <div className="space-y-8 [&>div>h2]:text-2xl [&>div>h2]:font-semibold [&>div>h2]:mb-4">
        {post.content.sections.map((section, index) => (
          <div key={index}>
            <h2>{`${index + 1}. ${section.title}`}</h2>
            <p className="text-muted-foreground">{section.content}</p>
            {section.image ? (
              <div className="mt-4 relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={section.image}
                  alt="Additional image for section 3"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {post.content.keyTakeawaysTitle}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
          {post.content.keyTakeaways.map((takeaway, index) => (
            <li key={index}>{takeaway}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground">{post.content.conclusion}</p>
      </div>

      <div className="text-muted-foreground">Thanks for reading ★</div>
      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Separator />
    </article>
  );
}
