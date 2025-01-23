import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PortfolioForm from "@/components/content-manager/PortfolioForm";
import AuthCheck from "@/components/content-manager/AuthCheck";

export const dynamic = "force-dynamic";

export default async function EditPortfolioPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !portfolio) {
    notFound();
  }

  return (
    <AuthCheck>
      <main className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Portfolio</h1>
        <PortfolioForm initialData={portfolio} />
      </main>
    </AuthCheck>
  );
}
