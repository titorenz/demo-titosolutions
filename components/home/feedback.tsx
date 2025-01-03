"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mark Zuckerberg",
    role: "CEO & Co-Founder",
    quote:
      "Outstanding service! Our project was completed on time and exceeded our expectations. The team at Tito Solutions truly understands our needs and delivers top-notch results.",
    image: "/landing-page/clients/mark.png",
  },
  {
    name: "Elon Musk",
    role: "CEO & Co-Founder",
    quote:
      "Working with Tito Solutions was a breeze. Their communication was excellent, and they were able to quickly address any issues that arose during development. Highly recommended!",
    image: "/landing-page/clients/elon.png",
  },
  {
    name: "Bill Gates",
    role: "Founder & CEO",
    quote:
      "Impressive expertise! The developers at Tito Solutions demonstrated deep knowledge of the latest technologies and provided innovative solutions to our complex problems.",
    image: "/landing-page/clients/bill.png",
  },
  {
    name: "Jeff Bezos",
    role: "CEO & Founder",
    quote:
      "Efficient and reliable! The team delivered our project ahead of schedule without compromising quality. Their attention to detail and commitment to customer satisfaction sets them apart.",
    image: "/landing-page/clients/jeff.png",
  },
  {
    name: "Jack Ma",
    role: "Co-Founder & Chairman",
    quote:
      "Exceptional customer support! Tito Solutions went above and beyond to ensure our needs were met every step of the way. We're grateful for their dedication and professionalism.",
    image: "/landing-page/clients/jack.png",
  },
  {
    name: "Oprah Winfrey",
    role: "Celebrity",
    quote:
      "A true partner in our success! They not only developed a stellar product for us but also provided valuable insights and guidance throughout the process. We couldn't be happier with the results.",
    image: "/landing-page/clients/opra.png",
  },
];

export default function Feedback() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>(
    []
  );
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    setVisibleTestimonials(getVisibleTestimonials(currentIndex));
  }, [currentIndex]);

  const getVisibleTestimonials = (startIndex: number) => {
    const visibleCount = 3;
    const visibleItems: Testimonial[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };

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

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-16">
          Feedback from
          <br />
          our clients
        </h2>

        {/* Mobile View */}
        <div className="md:hidden">
          <Card className="border border-gray-200 shadow-none mb-6">
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
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

        {/* Desktop Grid View */}
        <div className="hidden md:block relative">
          <div className="flex gap-4">
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-none flex-shrink-0 w-1/3 px-2"
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
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
      </div>
    </section>
  );
}
