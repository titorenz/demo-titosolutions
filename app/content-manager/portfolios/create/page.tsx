import AuthCheck from "@/components/content-manager/AuthCheck";
import PortfolioForm from "@/components/content-manager/PortfolioForm";

export default function CreatePortfolioPage() {
  return (
    <AuthCheck>
      <main className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Portfolio
        </h1>
        <PortfolioForm />
      </main>
    </AuthCheck>
  );
}
