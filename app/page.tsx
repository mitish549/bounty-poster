"use client";

import { useState } from "react";
import BountyPosterCanvas from "./components/BountyPosterCanvas";
import ImageUploader from "./components/ImageUploader";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [name, setName] = useState("MONKEY·D·LUFFY");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#090909",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "60px",
        padding: "40px",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "280px",
        }}
      >
        <ImageUploader onImageSelect={setImageUrl} />

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Character name"
          style={{
            padding: "12px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #555",
          }}
        />
      </section>

      <section>
        <BountyPosterCanvas
          imageUrl={imageUrl}
          name={name}
        />
      </section>
    </main>
  );
}