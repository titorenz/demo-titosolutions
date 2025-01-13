"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 px-4 md:px-8 mt-8 sm:mt-12 md:mt-16">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-[#f1f1f1] rounded-2xl px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium text-left mb-2 sm:mb-4">
            Never miss our update &
            <br className="hidden sm:block" />
            stay connected
          </h2>
          <p className="text-left text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full mx-auto pb-8 sm:pb-12 md:pb-20"
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-4 sm:pl-6 py-4 sm:py-6 rounded-full border-none bg-white"
            />
            <Button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 rounded-full bg-[#012241] hover:bg-[#012241]/90 font-semibold"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
