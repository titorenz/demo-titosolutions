"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  initialQuery?: string;
  postType: "blogs" | "news";
}

export function SearchBar({ initialQuery = "", postType }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (query) searchParams.set("search", query);
    router.push(`/${postType}?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-4 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 rounded-full"
      />
    </form>
  );
}
