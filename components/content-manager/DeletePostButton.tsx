"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

export default function DeletePostButton({
  slug,
  title,
}: {
  slug?: string;
  title: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true);
      const postSlug = slug || slugify(title);

      // Fetch the post to get the image URL
      const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("image_url")
        .eq("slug", postSlug)
        .single();

      if (fetchError) {
        console.error("Error fetching post:", fetchError);
        setIsDeleting(false);
        return;
      }

      // Delete the post
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("slug", postSlug);

      if (deleteError) {
        console.error("Error deleting post:", deleteError);
        setIsDeleting(false);
        return;
      }

      // If the post has an associated image, delete it from the bucket
      if (post.image_url) {
        try {
          // Extract the file path from the image URL
          const url = new URL(post.image_url);
          const filePath = url.pathname.split("/").pop();

          if (filePath) {
            const { error: storageError } = await supabase.storage
              .from("images")
              .remove([filePath]);

            if (storageError) {
              console.error("Error deleting image:", storageError);
            }
          }
        } catch (error) {
          console.error("Error parsing image URL:", error);
        }
      }

      router.push("/content-manager/dashboard/");
      router.refresh();
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete Post"}
    </Button>
  );
}
