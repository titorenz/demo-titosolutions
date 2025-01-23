import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function truncateTexts(name: string, maxLength: number) {
  return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
}

export function truncateCategory(name: string, maxLength: number) {
  return name.length > maxLength ? name.slice(0, maxLength) + "" : name;
}

export function stripHtmlAndTruncate(html: string, maxLength: number): string {
  const strippedText = html.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
  return strippedText.length > maxLength
    ? strippedText.slice(0, maxLength) + "..."
    : strippedText;
}
