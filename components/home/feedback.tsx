"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  stars: number;
}

export default function Feedback() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>(
    []
  );
  const [sliding, setSliding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const getVisibleTestimonials = useCallback(
    (startIndex: number) => {
      const visibleCount = 3;

      if (testimonials.length <= visibleCount) {
        return testimonials;
      }

      const visibleItems: Testimonial[] = [];
      for (let i = 0; i < visibleCount; i++) {
        const index = (startIndex + i) % testimonials.length;
        visibleItems.push(testimonials[index]);
      }
      return visibleItems;
    },
    [testimonials]
  );

  useEffect(() => {
    if (testimonials.length > 0) {
      setVisibleTestimonials(getVisibleTestimonials(currentIndex));
    }
  }, [currentIndex, testimonials, getVisibleTestimonials]);

  const handlePrevious = () => {
    if (!sliding) {
      setSliding(true);
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setTimeout(() => setSliding(false), 500);
    }
  };

  const handleNext = () => {
    if (!sliding) {
      setSliding(true);
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setSliding(false), 500);
    }
  };

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

  if (testimonials.length === 0) {
    return <div>No testimonials found.</div>;
  }

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-16">
          Feedback from
          <br />
          our clients
        </h2>

        {/* Single Testimonial View */}
        {testimonials.length === 1 ? (
          <Card className="border border-gray-200 shadow-none mb-6">
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[0].stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-base mb-6">
                &quot;{testimonials[0].quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  width={48}
                  height={48}
                  className="rounded-full w-12 h-12 object-cover object-top"
                />
                <div>
                  <h3 className="font-semibold">{testimonials[0].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[0].role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop Grid View */}
            <div className="hidden md:block relative">
              <div className="flex gap-4">
                {visibleTestimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="border border-gray-200 shadow-none flex-shrink-0 w-1/3 h-full px-2"
                  >
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-base mb-6">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full w-12 h-12 object-cover object-top"
                        />
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
            </div>

            {/* Mobile Carousel View */}
            <div className="md:hidden relative">
              <Card className="border border-gray-200 shadow-none mb-6">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].stars)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                  <p className="text-base mb-6">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={48}
                      height={48}
                      className="rounded-full w-12 h-12 object-cover object-top"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 items-center mt-8">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 rounded-full border border-[#B9B9B9] flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#B9B9B9] flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
