import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { sharedMetadata } from "./shared-metadata";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  ...sharedMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.titosolutions.ph" />
      </head>
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Company",
              name: "Tito Solutions",
              url: "https://www.titosolutions.ph",
              sameAs: [
                "https://www.linkedin.com/company/tito-solutions",
                "https://www.facebook.com/titosolutions",
              ],
              description:
                "A technology solutions company specializing in web and mobile development, helping businesses transform their ideas into innovative digital products using modern technologies and best practices.",
            }),
          }}
        />
      </body>
    </html>
  );
}
