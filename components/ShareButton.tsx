"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "next-share";

interface ShareButtonProps {
  url: string;
  title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePopup}
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
      </Button>
      {isOpen && (
        <div className="absolute bottom-full sm:left-0 -left-10 mb-2 bg-white border rounded-md shadow-lg p-2">
          <div className="flex space-x-2 mb-2">
            <FacebookShareButton url={url} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className={`w-full ${isCopied ? "bg-green-500 text-white" : ""}`}
          >
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
      )}
    </div>
  );
}
