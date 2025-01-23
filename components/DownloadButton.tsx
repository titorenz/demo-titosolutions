"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  title: string;
  content: string;
}

export function DownloadButton({ title, content }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);

    // Create the content for the text file
    const fileContent = `${title}\n\n${content}`;

    // Create a Blob with the file content
    const blob = new Blob([fileContent], { type: "text/plain" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsGenerating(false);
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      variant="ghost"
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
    </Button>
  );
}
