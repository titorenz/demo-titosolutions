import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export function useCategories(postType: "blogs" | "news") {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const refreshCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("type", postType)
      .order("name");
    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      setCategories(data || []);
    }
  }, [postType, supabase]);

  useEffect(() => {
    refreshCategories();
  }, [postType, refreshCategories]);

  return { categories, refreshCategories };
}
