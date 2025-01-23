"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationLinks } from "@/lib/constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="font-montserrat absolute top-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/tito-solutions-logo.svg"
            alt="Logo"
            width={160}
            height={160}
          />
        </Link>
        <nav className="hidden md:flex space-x-12 text-sm font-medium items-center">
          {NavigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-gray-400 text-gray-100"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="hidden md:flex bg-gray-100 rounded-full px-6 py-2 text-gray-800"
          >
            <Link href="https://www.talk2tito.solutions/" target="_blank">
              Ask for estimation
            </Link>
          </Button>
        </nav>
        <div className="sm:hidden flex items-center space-x-4">
          <button
            className="md:hidden text-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden px-4 py-2 bg-[#012241] backdrop-blur-md supports-[backdrop-filter]:bg-[#012241]/60">
          {NavigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-gray-100 hover:text-gray-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="w-full mt-2 bg-gray-100 text-gray-800">
            <Link
              href="https://www.talk2tito.solutions/"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
            >
              Ask for estimation
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
