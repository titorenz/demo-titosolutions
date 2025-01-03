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
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("slug", postSlug);

      if (error) {
        console.error(error);
        setIsDeleting(false);
      } else {
        router.push("/content-manager/dashboard/");
        router.refresh();
      }
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete Post"}
    </Button>
  );
}
