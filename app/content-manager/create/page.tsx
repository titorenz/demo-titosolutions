import AuthCheck from "@/components/content-manager/AuthCheck";
import PostForm from "@/components/content-manager/PostForm";
import CategoryManager from "@/components/content-manager/CategoryManager";

export default function CreatePost() {
  return (
    <AuthCheck>
      <main className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create a New Post
        </h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
            <PostForm />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6">
              <CategoryManager />
            </div>
          </div>
        </div>
      </main>
    </AuthCheck>
  );
}
