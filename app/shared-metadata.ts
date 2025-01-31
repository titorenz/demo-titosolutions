import type { Metadata } from "next";

export const sharedMetadata: Metadata = {
  title: {
    default: "Tito Solutions | Break Barriers Through Impactful Tech",
    template: "%s | Tito Solutions",
  },
  description:
    "Tito Solutions helps people and businesses materialize their tech ideas. With 40+ combined years of experience, we automate business processes and bring tech products to life.",
  keywords: [
    "Tito Solutions",
    "Tech Company",
    "Tech Consulting",
    "Software Development",
    "Startup Scaling",
    "Business Automation",
    "Product Development",
  ],
  authors: [{ name: "Tito Solutions Team" }],
  creator: "Tito Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.titosolutions.ph",
    siteName: "Tito Solutions",
    images: [
      {
        url: "/portfolio/office-mockup.png",
        width: 1200,
        height: 630,
        alt: "Tito Solutions - Break Barriers Through Impactful Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tito Solutions | Break Barriers Through Impactful Tech",
    description:
      "Helping businesses automate processes and bring tech products to life with 40+ years of combined experience.",
    images: ["/og-image.jpg"],
    creator: "@titosolutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
