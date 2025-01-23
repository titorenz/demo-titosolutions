"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PortfolioListItem } from "@/lib/types";

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState<PortfolioListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolios() {
      const { data, error } = await supabase
        .from("portfolios")
        .select("id, title, slug, cover_image, client, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching portfolios:", error);
      } else {
        setPortfolios(data || []);
      }
      setLoading(false);
    }

    fetchPortfolios();
  }, []);

  if (loading) {
    return <div>Loading portfolios...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <Link
          href={`/content-manager/portfolios/${portfolio.slug}`}
          key={portfolio.id}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative h-48">
                {portfolio.cover_image ? (
                  <Image
                    src={portfolio.cover_image}
                    alt={portfolio.title}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h2 className="text-lg font-semibold mb-2">{portfolio.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Client: {portfolio.client}
              </p>
              <p className="text-xs text-gray-500">
                Created: {new Date(portfolio.created_at).toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
