"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import dynamic from "next/dynamic";
import ImageUpload from "./ImageUpload";
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
import { slugify } from "@/lib/utils";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface PostFormProps {
  postId?: string;
  initialTitle?: string;
  initialContent?: string;
  initialImageUrl?: string;
  initialCategoryId?: number;
  initialPostType?: "blogs" | "news";
  initialSlug?: string;
}

export default function PostForm({
  postId,
  initialTitle = "",
  initialContent = "",
  initialImageUrl = "",
  initialCategoryId,
  initialPostType = "blogs",
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [categoryId, setCategoryId] = useState<number | null>(
    initialCategoryId || null
  );
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState<"blogs" | "news">(initialPostType);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const { categories, refreshCategories } = useCategories(postType);

  useEffect(() => {
    refreshCategories();
  }, [postType, refreshCategories]);

  const handleSubmit = useCallback(async () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!categoryId) {
      newErrors.category = "Please select a category";
    }

    if (!imageUrl && !postId) {
      newErrors.image = "Featured image is required for new posts";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const postData = {
        title,
        content,
        image_url: imageUrl,
        category_id: categoryId,
        post_type: postType,
        slug: slugify(title),
      };

      if (postId) {
        const { error } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", postId);
        if (error) throw error;
        router.push(`/content-manager/${postType}`);
      } else {
        const { error } = await supabase.from("posts").insert([postData]);
        if (error) throw error;
        router.push(`${postType}`);
      }
    } catch (error) {
      alert(postId ? "Error updating post!" : "Error creating post!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [title, content, imageUrl, categoryId, postType, postId, router]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {postId ? "Edit" : "Create"} Post
        </h2>
      </div>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className={`w-full ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="postType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Post Type
        </label>
        <Select
          value={postType}
          onValueChange={(value: "blogs" | "news") => {
            setPostType(value);
            setCategoryId(null);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select post type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blogs">Blogs</SelectItem>
            <SelectItem value="news">News</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <Select
          value={categoryId?.toString()}
          onValueChange={(value: string) => setCategoryId(parseInt(value))}
        >
          <SelectTrigger className={errors.category ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Featured Image {!postId && <span className="text-red-500">*</span>}
        </label>
        <ImageUpload onImageUpload={setImageUrl} />
        {imageUrl && (
          <div className="mt-2">
            <Image
              src={imageUrl}
              alt="Featured image"
              className="w-full h-48 object-cover rounded-md"
              width={300}
              height={200}
            />
          </div>
        )}
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <RichTextEditor content={content} onChange={setContent} />
      </div>
      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading
          ? postId
            ? "Updating..."
            : "Publishing..."
          : postId
          ? "Update"
          : "Publish"}
      </Button>
    </div>
  );
}
