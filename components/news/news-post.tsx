"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { ShareButton } from "@/components/ShareButton";
import { DownloadButton } from "../DownloadButton";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  categories: {
    name: string;
  };
}

export function NewsPost({ post }: { post: Post }) {
  const [postUrl, setPostUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.origin;
      const slug = post.title.toLowerCase().replace(/\s+/g, "-");
      setPostUrl(`${baseUrl}/news/${slug}`);
    }
  }, [post.title]);

  return (
    <article className="space-y-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-md font-semibold">
          <span className="text-primary hover:underline cursor-pointer">
            {post.categories.name}
          </span>
          <span className="text-muted-foreground">•</span>
          <time className="text-muted-foreground hover:text-[#85d54a] cursor-default">
            {formatDate(post.created_at)}
          </time>
        </div>

        <h1 className="text-3xl font-bold lg:text-4xl">{post.title}</h1>
        <div
          className="tiptap max-w-none"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(
              /<img/g,
              '<img style="max-width:100%;height:auto;"'
            ),
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-2">
          <ShareButton url={postUrl} title={post.title} />
          <DownloadButton title={post.title} content={post.content} />
        </div>
      </div>
      <Separator />
    </article>
  );
}
