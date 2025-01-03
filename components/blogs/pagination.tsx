// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export function Pagination() {
//   return (
//     <div className="flex items-center justify-center space-x-2">
//       <Button variant="outline_secondary" size="icon">
//         <ChevronLeft className="h-4 w-4" />
//       </Button>
//       <Button variant="outline_secondary">1</Button>
//       <Button variant="outline_secondary">2</Button>
//       <Button variant="outline_secondary">3</Button>
//       <Button variant="outline_secondary" size="icon">
//         <ChevronRight className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  categoryId?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  categoryId,
}: PaginationProps) {
  const createPageUrl = (page: number) => {
    const url = new URL(basePath, "http://localhost");
    url.searchParams.set("page", page.toString());
    if (categoryId) {
      url.searchParams.set("category", categoryId);
    }
    return url.pathname + url.search;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Link href={createPageUrl(currentPage - 1)} passHref>
        <Button
          variant="outline_secondary"
          size="icon"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={createPageUrl(page)} passHref>
          <Button
            variant={
              currentPage === page ? "current_page" : "outline_secondary"
            }
          >
            {page}
          </Button>
        </Link>
      ))}
      <Link href={createPageUrl(currentPage + 1)} passHref>
        <Button
          variant="outline_secondary"
          size="icon"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
