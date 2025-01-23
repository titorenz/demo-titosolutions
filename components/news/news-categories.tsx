import Link from "next/link";
import { supabase } from "@/lib/supabase";

export async function NewsCategories() {
  const { data: categoriesWithCounts } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      posts: posts(count)
      `
    )
    .eq("type", "news")
    .order("name");

  const categories =
    categoriesWithCounts?.map((category) => ({
      ...category,
      postCount: category.posts[0]?.count,
    })) || [];

  return (
    <div className="space-y-4 border px-6 py-7 rounded-xl">
      <h2 className="text-lg font-semibold inline-block border-b-2 border-current">
        News Categories
      </h2>
      <div className="space-y-2">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/news?category=${category.id}`}
            passHref
            className="flex gap-1 text-md hover:text-primary"
          >
            <span>{category.name}</span>
            <span className="text-muted-foreground">
              ({category.postCount})
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
