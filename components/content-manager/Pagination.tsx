import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="flex justify-center items-center space-x-2 mt-8">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)} passHref>
          <Button variant="outline">Previous</Button>
        </Link>
      ) : (
        <Button variant="outline" disabled>
          Previous
        </Button>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={createPageUrl(page)} passHref>
          <Button variant={currentPage === page ? "default" : "outline"}>
            {page}
          </Button>
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)} passHref>
          <Button variant="outline">Next</Button>
        </Link>
      ) : (
        <Button variant="outline" disabled>
          Next
        </Button>
      )}
    </div>
  );
}
