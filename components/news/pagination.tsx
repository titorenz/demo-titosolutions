import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline_secondary" size="icon">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline_secondary">1</Button>
      <Button variant="outline_secondary">2</Button>
      <Button variant="outline_secondary">3</Button>
      <Button variant="outline_secondary" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
