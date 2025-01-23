import AuthCheck from "@/components/content-manager/AuthCheck";
import PortfolioList from "@/components/content-manager/PortfolioList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PortfoliosPage() {
  return (
    <AuthCheck>
      <main className="container mx-auto p-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Portfolios</h1>
          <Link href="/content-manager/portfolios/create" passHref>
            <Button>Create New Portfolio</Button>
          </Link>
        </div>
        <PortfolioList />
      </main>
    </AuthCheck>
  );
}
