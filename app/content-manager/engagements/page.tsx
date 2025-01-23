import AuthCheck from "@/components/content-manager/AuthCheck";
import EngagementEditor from "@/components/content-manager/EngagementEditor";

export default function EngagementsPage() {
  return (
    <AuthCheck>
      <main className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Engagements Editor</h1>
        <EngagementEditor />
      </main>
    </AuthCheck>
  );
}
