"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { PortfolioListItem } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SuccessStories() {
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

  if (portfolios.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No portfolios available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <Card
          key={portfolio.id}
          className="group cursor-pointer border-none shadow-none"
        >
          <CardContent className="p-0">
            <Link href={`/portfolio/${portfolio.slug}`} className="block">
              <div className="relative aspect-square">
                <Image
                  src={portfolio.cover_image}
                  alt={portfolio.title}
                  fill
                  className="object-cover shadow-lg rounded-lg"
                />
              </div>
              <div className="pr-6 py-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold group-hover:text-[#85d54a]">
                  {portfolio.title}
                </h3>
                <ChevronRight className="w-10 h-10 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
