"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

export default function CategoryManager() {
  const [newCategory, setNewCategory] = useState("");
  const [categoryType, setCategoryType] = useState<"blogs" | "news">("blogs");
  const {
    categories: blogCategories,
    refreshCategories: refreshBlogCategories,
  } = useCategories("blogs");
  const {
    categories: newsCategories,
    refreshCategories: refreshNewsCategories,
  } = useCategories("news");
  const [deletingCategory, setDeletingCategory] = useState<{
    id: number;
    name: string;
    type: "blogs" | "news";
  } | null>(null);

  async function addCategory() {
    if (newCategory.trim()) {
      const { error } = await supabase
        .from("categories")
        .insert({ name: newCategory.trim(), type: categoryType })
        .select();
      if (error) {
        console.error("Error adding category:", error);
      } else {
        setNewCategory("");
        if (categoryType === "blogs") {
          refreshBlogCategories();
        } else {
          refreshNewsCategories();
        }
      }
    }
  }

  const handleDeleteCategory = (
    category: { id: number; name: string },
    type: "blogs" | "news"
  ) => {
    setDeletingCategory({ ...category, type });
  };

  const handleDeleteSuccess = () => {
    if (deletingCategory) {
      if (deletingCategory.type === "blogs") {
        refreshBlogCategories();
      } else {
        refreshNewsCategories();
      }
    }
    setDeletingCategory(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Categories</h2>
      <div className="space-y-4">
        <Select
          value={categoryType}
          onValueChange={(value: "blogs" | "news") => setCategoryType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blogs">Blogs</SelectItem>
            <SelectItem value="news">News</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-grow"
          />
          <Button onClick={addCategory}>Add</Button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Blogs Categories</h3>
          <ul className="list-disc list-inside space-y-1">
            {blogCategories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between"
              >
                <span>{category.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCategory(category, "blogs")}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">News Categories</h3>
          <ul className="list-disc list-inside space-y-1">
            {newsCategories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between"
              >
                <span>{category.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCategory(category, "news")}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {deletingCategory && (
        <DeleteCategoryModal
          isOpen={!!deletingCategory}
          onClose={() => setDeletingCategory(null)}
          categoryId={deletingCategory.id}
          categoryName={deletingCategory.name}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
