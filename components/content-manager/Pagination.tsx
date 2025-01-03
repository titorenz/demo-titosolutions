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
      <Link href={createPageUrl(currentPage - 1)} passHref>
        <Button variant="outline" disabled={currentPage === 1}>
          Previous
        </Button>
      </Link>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={createPageUrl(page)} passHref>
          <Button variant={currentPage === page ? "default" : "outline"}>
            {page}
          </Button>
        </Link>
      ))}
      <Link href={createPageUrl(currentPage + 1)} passHref>
        <Button variant="outline" disabled={currentPage === totalPages}>
          Next
        </Button>
      </Link>
    </div>
  );
}
