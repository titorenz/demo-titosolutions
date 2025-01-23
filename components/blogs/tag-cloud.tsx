import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const tags = ["Article", "Business", "Digital", "Technology", "UI/UX"];

export function TagCloud() {
  return (
    <div className="space-y-4 border px-6 py-7 rounded-xl">
      <h2 className="text-lg font-semibold inline-block border-b-2 border-current">
        Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
            <Badge
              variant="secondary"
              className="text-sm font-normal px-3 py-1 hover:bg-[#85d54a] hover:text-white"
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
