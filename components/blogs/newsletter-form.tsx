"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  return (
    <div className="space-y-4 border px-6 py-7 rounded-xl">
      <h2 className="text-lg font-semibold inline-block border-b-2 border-current">
        Subscribe
      </h2>
      <p className="text-sm text-muted-foreground">
        Subscribe to our newsletter and get the latest news updates from me
      </p>
      <form className="space-y-3">
        <Input
          type="email"
          placeholder="Enter your email address"
          className="w-full text-center rounded-full border border-gray-800"
        />
        <Button className="w-full rounded-full">Subscribe Now</Button>
      </form>
    </div>
  );
}
