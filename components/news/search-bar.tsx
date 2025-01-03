import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Type to search..." className="pl-10 rounded-full" />
    </div>
  );
}
