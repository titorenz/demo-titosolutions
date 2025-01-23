import { Links } from "@/lib/types";
import Link from "next/link";

const Breadcrumb = ({ paths }: { paths: Links[] }) => {
  return (
    <nav className="text-gray-100 text-md">
      <ul className="flex space-x-2">
        {paths.map((path: Links, index: number) => (
          <li key={index} className="flex items-center">
            <Link href={path.href}>
              <p
                className={`hover:underline ${
                  index === paths.length - 1
                    ? "text-[#85d54a]"
                    : "text-gray-100"
                }`}
              >
                {path.label}
              </p>
            </Link>
            {index < paths.length - 1 && (
              <span className="mx-2 text-gray-100 text-md font-bold">
                {" "}
                &gt;{" "}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
