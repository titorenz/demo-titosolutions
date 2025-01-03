"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteCategory(categoryId: number) {
  const supabase = createServerActionClient({ cookies });

  try {
    // Delete all posts associated with the category
    const { error: postsError } = await supabase
      .from("posts")
      .delete()
      .eq("category_id", categoryId);

    if (postsError) throw postsError;

    // Delete the category
    const { error: categoryError } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (categoryError) throw categoryError;

    revalidatePath("/content-manager/");
    revalidatePath("/content-manager/create");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}
