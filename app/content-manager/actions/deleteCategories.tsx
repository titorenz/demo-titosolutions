"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteCategory(categoryId: number) {
  const supabase = createServerActionClient({ cookies });

  try {
    // Fetch all posts associated with the category
    const { data: posts, error: fetchPostsError } = await supabase
      .from("posts")
      .select("id, image_url")
      .eq("category_id", categoryId);

    if (fetchPostsError) throw fetchPostsError;

    // Collect image file paths to delete
    const filePathsToDelete: string[] = [];

    if (posts && posts.length > 0) {
      for (const post of posts) {
        if (post.image_url) {
          try {
            // Extract the file path from the image URL
            const url = new URL(post.image_url);
            const filePath = url.pathname.split("/").pop();
            if (filePath) filePathsToDelete.push(filePath);
          } catch (error) {
            console.error("Error parsing image URL:", error);
          }
        }
      }

      // Delete images from the bucket
      if (filePathsToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("images")
          .remove(filePathsToDelete);

        if (storageError) throw storageError;
      }

      // Delete all posts associated with the category
      const { error: postsError } = await supabase
        .from("posts")
        .delete()
        .eq("category_id", categoryId);

      if (postsError) throw postsError;
    }

    // Delete the category
    const { error: categoryError } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (categoryError) throw categoryError;

    // Revalidate paths
    revalidatePath("/content-manager/");
    revalidatePath("/content-manager/create");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}
