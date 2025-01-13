"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const ImageUpload = ({
  onImageUpload,
}: {
  onImageUpload: (url: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);
      onImageUpload(data.publicUrl);
      setImageSelected(true);
    } catch (error) {
      alert("Error uploading image!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {imageSelected && (
        <p className="text-green-500 text-sm mt-1">
          Image selected successfully
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
