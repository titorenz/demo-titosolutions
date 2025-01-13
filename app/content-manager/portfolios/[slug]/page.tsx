import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Section } from "@/lib/types";

async function deletePortfolio(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;

  // Fetch the portfolio to get the image URLs
  const { data: portfolio, error: fetchError } = await supabase
    .from("portfolios")
    .select("cover_image, overview_image, project_results_image")
    .eq("id", id)
    .single();

  if (fetchError || !portfolio) {
    console.error("Error fetching portfolio:", fetchError);
    throw new Error("Failed to fetch portfolio");
  }

  // Collect image file paths to delete
  const filePathsToDelete: string[] = [];

  // Extract file paths from image URLs
  const extractFilePath = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.split("/").pop();
    } catch (error) {
      console.error("Error parsing image URL:", error);
      return null;
    }
  };

  if (portfolio.cover_image) {
    const filePath = extractFilePath(portfolio.cover_image);
    if (filePath) filePathsToDelete.push(filePath);
  }

  if (portfolio.overview_image) {
    const filePath = extractFilePath(portfolio.overview_image);
    if (filePath) filePathsToDelete.push(filePath);
  }

  if (portfolio.project_results_image) {
    const filePath = extractFilePath(portfolio.project_results_image);
    if (filePath) filePathsToDelete.push(filePath);
  }

  // Delete images from the bucket
  if (filePathsToDelete.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("images")
      .remove(filePathsToDelete);

    if (storageError) {
      console.error("Error deleting images:", storageError);
      throw new Error("Failed to delete images");
    }
  }

  // Delete the portfolio
  const { error: deleteError } = await supabase
    .from("portfolios")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Error deleting portfolio:", deleteError);
    throw new Error("Failed to delete portfolio");
  }

  // Revalidate and redirect
  revalidatePath("/content-manager/portfolios");
  redirect("/content-manager/portfolios");
}

export const dynamic = "force-dynamic";

export default async function PortfolioPage(props: {
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

  const projectDetails = [
    { label: portfolio.client, value: portfolio.client_value },
    { label: portfolio.services, value: portfolio.services_value },
    { label: portfolio.duration, value: portfolio.duration_value },
    {
      label: portfolio.website,
      value: (
        <Link
          href={portfolio.website_value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Preview
        </Link>
      ),
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/content-manager/portfolios"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Portfolios
      </Link>
      <article className="max-w-6xl mx-auto">
        <div className="w-full space-y-6 sm:space-y-16 mb-8">
          <h1 className="text-4xl text-center sm:text-left sm:text-6xl font-bold max-w-2xl">
            {portfolio.title}
          </h1>
          <Image
            className="w-full h-[13em] sm:h-[35em] object-cover rounded-xl shadow-xl"
            src={portfolio.cover_image}
            alt={portfolio.title}
            width={1080}
            height={350}
          />

          <div className="w-full flex sm:flex-row flex-col justify-between">
            {projectDetails.map((detail, index) => (
              <div
                key={index}
                className="flex flex-row items-center sm:items-baseline sm:flex-col gap-2"
              >
                <p>{detail.label}:</p>
                <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold">
                  {detail.value}
                </h1>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-6 sm:mt-10 mb-10 sm:mb-20">
          <div>
            <Image
              className="w-full h-[20em] sm:h-[28em] object-cover rounded-xl"
              src={portfolio.overview_image}
              alt={portfolio.overview_title}
              width={1080}
              height={350}
            />
          </div>
          <div className="space-y-4 sm:space-y-8 py-2 sm:py-4">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
              {portfolio.overview_title}
            </h1>
            <h2 className="text-lg sm:text-xl font-bold">
              {portfolio.overview_description}
            </h2>

            <ul className="list-disc pl-4 sm:pl-6 space-y-3 sm:space-y-4">
              {portfolio.additional_sections.map(
                (section: Section, index: number) => (
                  <li key={index}>
                    <h3 className="text-lg sm:text-xl font-semibold">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base">{section.text}</p>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-8 py-2 sm:py-4">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
              {portfolio.project_results_title}
            </h1>
            <h2 className="text-lg sm:text-xl font-bold">
              {portfolio.project_results_description}
            </h2>

            <ul className="list-disc pl-4 sm:pl-6 space-y-3 sm:space-y-4">
              {portfolio.project_results_sections.map(
                (section: Section, index: number) => (
                  <li key={index}>
                    <h3 className="text-lg sm:text-xl font-semibold">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base">{section.text}</p>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <Image
              className="w-full h-[16em] sm:h-[22em] object-cover rounded-xl"
              src={portfolio.project_results_image}
              alt={portfolio.project_results_title}
              width={1080}
              height={350}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Link
            href={`/content-manager/portfolios/edit/${portfolio.slug}`}
            passHref
          >
            <Button>Edit Portfolio</Button>
          </Link>
          <form action={deletePortfolio}>
            <input type="hidden" name="id" value={portfolio.id} />
            <Button type="submit" variant="destructive">
              Delete Portfolio
            </Button>
          </form>
        </div>
      </article>
    </main>
  );
}
