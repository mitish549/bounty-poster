"use client";

import { useEffect, useRef } from "react";

type BountyPosterCanvasProps = {
  imageUrl: string | null;
  name: string;
};

export default function BountyPosterCanvas({
  imageUrl,
  name,
}: BountyPosterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // --------------------------------
    // POSTER SIZE
    // --------------------------------

    const WIDTH = 2400;
    const HEIGHT = 3400;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // --------------------------------
    // LOAD TEMPLATE
    // --------------------------------

    const template = new Image();

    template.onload = () => {
      // Draw the complete Figma template
      ctx.drawImage(
        template,
        0,
        0,
        WIDTH,
        HEIGHT
      );

      // --------------------------------
      // PHOTO
      // --------------------------------

      if (imageUrl) {
        const userImage = new Image();

        userImage.onload = () => {
          drawPosterContents(ctx, userImage);
        };

        userImage.src = imageUrl;
      } else {
        // No photo yet
        drawPosterContents(ctx, null);
      }
    };

    template.src = "/poster/template.png";

    // --------------------------------
    // DRAW DYNAMIC CONTENT
    // --------------------------------

    function drawPosterContents(
      context: CanvasRenderingContext2D,
      userImage: HTMLImageElement | null
    ) {
      // =================================
      // PHOTO FRAME
      // =================================

      const photoX = 208;
      const photoY = 680;
      const photoWidth = 1980;
      const photoHeight = 1480;

      if (userImage) {
        const imageRatio =
          userImage.width / userImage.height;

        const frameRatio =
          photoWidth / photoHeight;

        let drawWidth: number;
        let drawHeight: number;

        // Make image behave like object-fit: cover
        if (imageRatio > frameRatio) {
          drawHeight = photoHeight;
          drawWidth = drawHeight * imageRatio;
        } else {
          drawWidth = photoWidth;
          drawHeight = drawWidth / imageRatio;
        }

        const drawX =
          photoX +
          (photoWidth - drawWidth) / 2;

        const drawY =
          photoY +
          (photoHeight - drawHeight) / 2;

        context.save();

        context.beginPath();

        context.rect(
          photoX,
          photoY,
          photoWidth,
          photoHeight
        );

        context.clip();

        context.drawImage(
          userImage,
          drawX,
          drawY,
          drawWidth,
          drawHeight
        );

        context.restore();
      }

      // =================================
      // CHARACTER NAME
      // =================================

      context.fillStyle = "#3B2924";

      context.textAlign = "center";
      context.textBaseline = "middle";

      context.font =
        "bold 145px 'Times New Roman', serif";

      context.fillText(
        name || "",
        WIDTH / 2,
        2700
      );
    }
  }, [imageUrl, name]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: "600px",
        height: "auto",
        display: "block",
      }}
    />
  );
}