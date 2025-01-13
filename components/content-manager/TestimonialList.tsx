"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  stars: number;
}

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {testimonials.map((testimonial) => (
        <Card
          key={testimonial.id}
          className="border border-gray-200 shadow-none flex-shrink-0 px-2 md:px-4 min-h-[18em]"
        >
          <CardContent className="p-4 md:p-6 flex flex-col justify-between h-full">
            <div className="flex gap-1 mb-4 flex-wrap">
              {[...Array(testimonial.stars)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  aria-label={`Star ${i + 1}`}
                />
              ))}
            </div>
            <p className="text-base mb-6">&quot;{testimonial.quote}&quot;</p>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
