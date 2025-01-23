"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type LucideIcon,
  LayoutDashboard,
  FileText,
  Newspaper,
  PlusCircle,
  Briefcase,
  BarChart,
  MessageSquare,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/content-manager");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="lg:hidden fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div
        className={cn(
          "pb-12 fixed lg:relative h-screen lg:h-auto bg-white z-40 transition-transform duration-200 ease-in-out",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <div className="space-y-4 py-4 sm:pt-0 pt-12">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <div className="space-y-1">
              <NavItem
                href="/content-manager/dashboard"
                icon={LayoutDashboard}
                active={pathname === "/content-manager/dashboard"}
                closeSidebar={closeSidebar}
              >
                Overview
              </NavItem>
              <NavItem
                href="/content-manager/blogs"
                icon={FileText}
                active={pathname === "/content-manager/blogs"}
                closeSidebar={closeSidebar}
              >
                Blogs
              </NavItem>
              <NavItem
                href="/content-manager/news"
                icon={Newspaper}
                active={pathname === "/content-manager/news"}
                closeSidebar={closeSidebar}
              >
                News
              </NavItem>
              <NavItem
                href="/content-manager/create"
                icon={PlusCircle}
                active={pathname === "/content-manager/create"}
                closeSidebar={closeSidebar}
              >
                Create Post
              </NavItem>
              <NavItem
                href="/content-manager/portfolios"
                icon={Briefcase}
                active={pathname === "/content-manager/portfolios"}
                closeSidebar={closeSidebar}
              >
                Portfolios
              </NavItem>
              <NavItem
                href="/content-manager/engagements"
                icon={BarChart}
                active={pathname === "/content-manager/engagements"}
                closeSidebar={closeSidebar}
              >
                Engagements
              </NavItem>
              <NavItem
                href="/content-manager/testimonials"
                icon={MessageSquare}
                active={pathname === "/content-manager/testimonials"}
                closeSidebar={closeSidebar}
              >
                Testimonials
              </NavItem>
            </div>
          </div>
        </div>
        <div className="px-3 py-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon: LucideIcon;
  active?: boolean;
  closeSidebar: () => void;
}

function NavItem({
  href,
  icon: Icon,
  active,
  closeSidebar,
  children,
}: NavItemProps) {
  return (
    <Button
      asChild
      variant={active ? "secondary" : "ghost"}
      className="w-full justify-start"
      onClick={closeSidebar}
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {children}
      </Link>
    </Button>
  );
}
