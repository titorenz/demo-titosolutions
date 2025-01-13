"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import ImageUpload from "./ImageUpload";
import { Star } from "lucide-react";
import Image from "next/image";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface Testimonial {
  id?: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  stars: number;
}

export default function TestimonialEditor() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial>({
    name: "",
    role: "",
    quote: "",
    image: "",
    stars: 5,
  });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("id");

    if (error) {
      console.error("Error fetching testimonials:", error);
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      const { error } = await supabase
        .from("testimonials")
        .update(currentTestimonial)
        .eq("id", editingId);

      if (error) {
        console.error("Error updating testimonial:", error);
      } else {
        setTestimonials(
          testimonials.map((t) => (t.id === editingId ? currentTestimonial : t))
        );
        setEditingId(null);
      }
    } else {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([currentTestimonial])
        .select();

      if (error) {
        console.error("Error adding testimonial:", error);
      } else {
        setTestimonials([...testimonials, data[0]]);
      }
    }

    setCurrentTestimonial({
      name: "",
      role: "",
      quote: "",
      image: "",
      stars: 5,
    });
    setLoading(false);
  }

  async function handleDelete(id: number) {
    setLoading(true);

    // Fetch the testimonial to get the image URL
    const { data: testimonial, error: fetchError } = await supabase
      .from("testimonials")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError || !testimonial) {
      console.error("Error fetching testimonial:", fetchError);
      setLoading(false);
      return;
    }

    // Extract the file path from the image URL
    const extractFilePath = (url: string) => {
      try {
        const urlObj = new URL(url);
        return urlObj.pathname.split("/").pop();
      } catch (error) {
        console.error("Error parsing image URL:", error);
        return null;
      }
    };

    const filePath = testimonial.image
      ? extractFilePath(testimonial.image)
      : null;

    // Delete the image from the bucket if it exists
    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([filePath]);

      if (storageError) {
        console.error("Error deleting image:", storageError);
        setLoading(false);
        return;
      }
    }

    // Delete the testimonial
    const { error: deleteError } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting testimonial:", deleteError);
    } else {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }

    setLoading(false);
    setDeleteConfirmation(null);
  }

  function handleEdit(testimonial: Testimonial) {
    setCurrentTestimonial(testimonial);
    setEditingId(testimonial.id!);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Name"
          value={currentTestimonial.name}
          onChange={(e) =>
            setCurrentTestimonial({
              ...currentTestimonial,
              name: e.target.value,
            })
          }
          required
        />
        <Input
          placeholder="Role"
          value={currentTestimonial.role}
          onChange={(e) =>
            setCurrentTestimonial({
              ...currentTestimonial,
              role: e.target.value,
            })
          }
          required
        />
        <Textarea
          placeholder="Quote"
          value={currentTestimonial.quote}
          onChange={(e) =>
            setCurrentTestimonial({
              ...currentTestimonial,
              quote: e.target.value,
            })
          }
          required
        />
        <ImageUpload
          onImageUpload={(url) =>
            setCurrentTestimonial({ ...currentTestimonial, image: url })
          }
        />
        <div className="flex items-center space-x-2">
          <span>Stars:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 cursor-pointer ${
                star <= currentTestimonial.stars
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() =>
                setCurrentTestimonial({ ...currentTestimonial, stars: star })
              }
            />
          ))}
        </div>
        <Button type="submit">
          {editingId ? "Update Testimonial" : "Add Testimonial"}
        </Button>
        {editingId && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setEditingId(null);
              setCurrentTestimonial({
                name: "",
                role: "",
                quote: "",
                image: "",
                stars: 5,
              });
            }}
          >
            Cancel Edit
          </Button>
        )}
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="border border-gray-200 shadow-none flex-shrink-0 px-2 md:px-4 min-h-[18em]"
          >
            <CardContent className="p-4 md:p-6 flex flex-col justify-between h-full">
              <div className="flex justify-center gap-1 mb-4 flex-wrap">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    aria-label={`Star ${i + 1}`}
                  />
                ))}
              </div>

              <p className="text-base text-center mb-6">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="flex items-center gap-4">
                {testimonial.image && (
                  <Image
                    src={testimonial.image}
                    alt={`Profile picture of ${testimonial.name}`}
                    width={48}
                    height={48}
                    className="rounded-full w-8 h-8 md:w-12 md:h-12 object-cover object-top"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Button
                  aria-label={`Edit ${testimonial.name}`}
                  onClick={() => handleEdit(testimonial)}
                >
                  Edit
                </Button>
                <Button
                  aria-label={`Delete ${testimonial.name}`}
                  variant="destructive"
                  onClick={() =>
                    setDeleteConfirmation({
                      id: testimonial.id!,
                      name: testimonial.name,
                    })
                  }
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {deleteConfirmation && (
        <DeleteConfirmationModal
          isOpen={!!deleteConfirmation}
          onClose={() => setDeleteConfirmation(null)}
          onConfirm={() => handleDelete(deleteConfirmation.id)}
          itemName={`testimonial from ${deleteConfirmation.name}`}
        />
      )}
    </div>
  );
}
