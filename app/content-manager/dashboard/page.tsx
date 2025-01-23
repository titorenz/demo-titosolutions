import { supabase } from "@/lib/supabase";
import AuthCheck from "@/components/content-manager/AuthCheck";
import TestimonialList from "@/components/content-manager/TestimonialList";

export const dynamic = "force-dynamic";

interface Engagement {
  id: number;
  value: string;
  suffix: string;
  label: string;
}

export default async function Dashboard() {
  const { data: engagements, error } = await supabase
    .from("engagements")
    .select("*")
    .order("id");

  if (error) {
    console.error("Error fetching engagements:", error);
  }

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Engagements</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {engagements?.map((engagement: Engagement) => (
              <div
                key={engagement.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <p className="text-3xl font-bold">
                  {engagement.value}
                  <span className="text-2xl">{engagement.suffix}</span>
                </p>
                <p className="text-gray-600">{engagement.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <TestimonialList />
        </div>
      </div>
    </AuthCheck>
  );
}
