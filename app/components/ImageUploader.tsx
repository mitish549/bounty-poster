"use client";

import { ChangeEvent } from "react";

type ImageUploaderProps = {
  onImageSelect: (imageUrl: string) => void;
};

export default function ImageUploader({
  onImageSelect,
}: ImageUploaderProps) {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    onImageSelect(imageUrl);
  };

  return (
    <div>
      <label
        htmlFor="photo-upload"
        style={{
          display: "inline-block",
          padding: "12px 20px",
          background: "#c90000",
          color: "#ffffff",
          fontWeight: 700,
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        UPLOAD PHOTO
      </label>

      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
}