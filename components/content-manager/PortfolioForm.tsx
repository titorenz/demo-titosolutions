"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Portfolio, Section } from "@/lib/types";
import ImageUpload from "@/components/content-manager/ImageUpload";
import { slugify } from "@/lib/utils";

interface PortfolioFormProps {
  initialData?: Portfolio;
}

export default function PortfolioForm({ initialData }: PortfolioFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
  const [client, setClient] = useState(initialData?.client || "");
  const [services, setServices] = useState(initialData?.services || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [clientValue, setClientValue] = useState(
    initialData?.client_value || ""
  );
  const [servicesValue, setServicesValue] = useState(
    initialData?.services_value || ""
  );
  const [durationValue, setDurationValue] = useState(
    initialData?.duration_value || ""
  );
  const [websiteValue, setWebsiteValue] = useState(
    initialData?.website_value || ""
  );
  const [overviewImage, setOverviewImage] = useState(
    initialData?.overview_image || ""
  );
  const [overviewTitle, setOverviewTitle] = useState(
    initialData?.overview_title || ""
  );
  const [overviewDescription, setOverviewDescription] = useState(
    initialData?.overview_description || ""
  );
  const [projectResultsTitle, setProjectResultsTitle] = useState(
    initialData?.project_results_title || ""
  );
  const [projectResultsDescription, setProjectResultsDescription] = useState(
    initialData?.project_results_description || ""
  );
  const [projectResultsImage, setProjectResultsImage] = useState(
    initialData?.project_results_image || ""
  );
  const [additionalSections, setAdditionalSections] = useState(
    initialData?.additional_sections || [
      { title: "", text: "" },
      { title: "", text: "" },
      { title: "", text: "" },
    ]
  );
  const [projectResultsSections, setProjectResultsSections] = useState(
    initialData?.project_results_sections || [
      { title: "", text: "" },
      { title: "", text: "" },
    ]
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdditionalSectionChange = (
    index: number,
    field: "title" | "text",
    value: string
  ) => {
    const newSections = [...additionalSections];
    newSections[index][field] = value;
    setAdditionalSections(newSections);
  };

  const handleProjectResultsSectionChange = (
    index: number,
    field: "title" | "text",
    value: string
  ) => {
    const newSections = [...projectResultsSections];
    newSections[index][field] = value;
    setProjectResultsSections(newSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = initialData ? initialData.slug : slugify(title);

    const portfolioData = {
      title,
      slug,
      cover_image: coverImage,
      client,
      services,
      duration,
      website,
      client_value: clientValue,
      services_value: servicesValue,
      duration_value: durationValue,
      website_value: websiteValue,
      overview_image: overviewImage,
      overview_title: overviewTitle,
      overview_description: overviewDescription,
      project_results_title: projectResultsTitle,
      project_results_description: projectResultsDescription,
      project_results_image: projectResultsImage,
      additional_sections: additionalSections,
      project_results_sections: projectResultsSections,
    };

    try {
      if (initialData) {
        const { error } = await supabase
          .from("portfolios")
          .update(portfolioData)
          .eq("id", initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("portfolios")
          .insert([portfolioData]);

        if (error) throw error;
      }

      router.push("/content-manager/portfolios");
    } catch (error) {
      alert(
        initialData ? "Error updating portfolio!" : "Error creating portfolio!"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="cover-image"
          className="block text-sm font-medium text-gray-700"
        >
          Cover Image
        </label>
        <ImageUpload onImageUpload={setCoverImage} />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="client"
          className="block text-sm font-medium text-gray-700"
        >
          Project Detail e.g. Client
        </label>
        <Input
          id="client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Label"
          required
        />
        <Input
          id="client-value"
          value={clientValue}
          onChange={(e) => setClientValue(e.target.value)}
          placeholder="Value"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="services"
          className="block text-sm font-medium text-gray-700"
        >
          Project Detail e.g. Services
        </label>
        <Input
          id="services"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          placeholder="Label"
          required
        />
        <Input
          id="services-value"
          value={servicesValue}
          onChange={(e) => setServicesValue(e.target.value)}
          placeholder="Value"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Project Detail e.g. Duration
        </label>
        <Input
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Label"
          required
        />
        <Input
          id="duration-value"
          value={durationValue}
          onChange={(e) => setDurationValue(e.target.value)}
          placeholder="Value"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="website"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Detail e.g. Website
        </label>
        <Input
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Label"
          required
        />
        <Input
          id="website-value"
          type="url"
          value={websiteValue}
          onChange={(e) => setWebsiteValue(e.target.value)}
          placeholder="Value"
          required
        />
      </div>

      <div>
        <label
          htmlFor="overview-image"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Overview Image
        </label>
        <ImageUpload onImageUpload={setOverviewImage} />
      </div>

      <div>
        <label
          htmlFor="overview-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Overview Title
        </label>
        <Input
          id="overview-title"
          value={overviewTitle}
          onChange={(e) => setOverviewTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="overview-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Overview Description
        </label>
        <Textarea
          id="overview-description"
          value={overviewDescription}
          onChange={(e) => setOverviewDescription(e.target.value)}
          required
        />
      </div>

      {additionalSections.map((section: Section, index: number) => (
        <div key={index} className="space-y-2">
          <Input
            placeholder={`Additional Section ${index + 1} Title`}
            value={section.title}
            onChange={(e) =>
              handleAdditionalSectionChange(index, "title", e.target.value)
            }
            required
          />
          <Textarea
            placeholder={`Additional Section ${index + 1} Text`}
            value={section.text}
            onChange={(e) =>
              handleAdditionalSectionChange(index, "text", e.target.value)
            }
            required
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="project-results-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Results Title
        </label>
        <Input
          id="project-results-title"
          value={projectResultsTitle}
          onChange={(e) => setProjectResultsTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="project-results-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Results Description
        </label>
        <Textarea
          id="project-results-description"
          value={projectResultsDescription}
          onChange={(e) => setProjectResultsDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="project-results-image"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Results Image
        </label>
        <ImageUpload onImageUpload={setProjectResultsImage} />
      </div>

      {projectResultsSections.map((section: Section, index: number) => (
        <div key={index} className="space-y-2">
          <Input
            placeholder={`Project Results Section ${index + 1} Title`}
            value={section.title}
            onChange={(e) =>
              handleProjectResultsSectionChange(index, "title", e.target.value)
            }
            required
          />
          <Textarea
            placeholder={`Project Results Section ${index + 1} Text`}
            value={section.text}
            onChange={(e) =>
              handleProjectResultsSectionChange(index, "text", e.target.value)
            }
            required
          />
        </div>
      ))}

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? initialData
            ? "Updating..."
            : "Publishing..."
          : initialData
          ? "Update Portfolio"
          : "Publish Portfolio"}
      </Button>
    </form>
  );
}
