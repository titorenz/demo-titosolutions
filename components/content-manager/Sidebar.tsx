"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type LucideIcon,
  LayoutDashboard,
  FileText,
  Newspaper,
  PlusCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <NavItem
              href="/content-manager/dashboard"
              icon={LayoutDashboard}
              active={pathname === "/dashboard"}
            >
              Overview
            </NavItem>
            <NavItem
              href="/content-manager/blog"
              icon={FileText}
              active={pathname === "/blog"}
            >
              Blogs
            </NavItem>
            <NavItem
              href="/content-manager/news"
              icon={Newspaper}
              active={pathname === "/news"}
            >
              News
            </NavItem>
            <NavItem
              href="/content-manager/create"
              icon={PlusCircle}
              active={pathname === "/content-manager/create"}
            >
              Create Post
            </NavItem>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon: LucideIcon;
  active?: boolean;
}

function NavItem({ href, icon: Icon, active, children }: NavItemProps) {
  return (
    <Button
      asChild
      variant={active ? "secondary" : "ghost"}
      className="w-full justify-start"
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {children}
      </Link>
    </Button>
  );
}
