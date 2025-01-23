import AuthCheck from "@/components/content-manager/AuthCheck";
import TestimonialEditor from "@/components/content-manager/TestimonialEditor";

export default function TestimonialsPage() {
  return (
    <AuthCheck>
      <main className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Testimonials Editor</h1>
        <TestimonialEditor />
      </main>
    </AuthCheck>
  );
}
