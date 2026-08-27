"use client";

import { useEffect, useRef } from "react";

type BountyPosterCanvasProps = {
  imageUrl: string | null;
  name: string;
  bounty: string;
  zoom: number;
  positionX: number;
  positionY: number;
  onCanvasReady?: (
    canvas: HTMLCanvasElement
  ) => void;
};

export default function BountyPosterCanvas({
  imageUrl,
  name,
  bounty,
  zoom,
  positionX,
  positionY,
  onCanvasReady,
}: BountyPosterCanvasProps) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const templateRef =
    useRef<HTMLImageElement | null>(null);

  const photoRef =
    useRef<HTMLImageElement | null>(null);

  const beliSymbolRef =
    useRef<HTMLImageElement | null>(null);

  const assetsReadyRef =
    useRef(false);

  const WIDTH = 2400;
  const HEIGHT = 3400;

  // ==========================================
  // LOAD TEMPLATE, SYMBOL AND FONTS ONCE
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    const loadAssets = async () => {
      try {
        // --------------------------------------
        // CATTLE TRAIL
        // --------------------------------------

        const cattleFont = new FontFace(
          "CattleTrailJNL",
          "url('/fonts/CattleTrailJNL.otf')"
        );

        // --------------------------------------
        // MARGARET RIVER
        // --------------------------------------

        const margaretFont = new FontFace(
          "MargaretRiver",
          "url('/fonts/MargaretRiver.ttf')"
        );

        await Promise.all([
          cattleFont.load(),
          margaretFont.load(),
        ]);

        if (cancelled) return;

        document.fonts.add(cattleFont);
        document.fonts.add(margaretFont);

        // --------------------------------------
        // TEMPLATE
        // --------------------------------------

        const template = new Image();

        await new Promise<void>(
          (resolve, reject) => {
            template.onload = () =>
              resolve();

            template.onerror = () =>
              reject(
                new Error(
                  "Could not load template.png"
                )
              );

            template.src =
              "/poster/template.png";
          }
        );

        if (cancelled) return;

        templateRef.current = template;

        // --------------------------------------
        // BELI SYMBOL
        // --------------------------------------

        const beliSymbol = new Image();

        await new Promise<void>(
          (resolve, reject) => {
            beliSymbol.onload = () =>
              resolve();

            beliSymbol.onerror = () =>
              reject(
                new Error(
                  "Could not load beri-symbol.png"
                )
              );

            beliSymbol.src =
              "/poster/beri-symbol.png";
          }
        );

        if (cancelled) return;

        beliSymbolRef.current =
          beliSymbol;

        // --------------------------------------
        // ASSETS READY
        // --------------------------------------

        assetsReadyRef.current = true;

        drawCanvas();
      } catch (error) {
        console.error(
          "Asset loading failed:",
          error
        );
      }
    };

    loadAssets();

    return () => {
      cancelled = true;
    };
  }, []);

  // ==========================================
  // LOAD UPLOADED PHOTO
  // ==========================================

  useEffect(() => {
    if (!imageUrl) {
      photoRef.current = null;

      if (assetsReadyRef.current) {
        drawCanvas();
      }

      return;
    }

    const image = new Image();

    image.onload = () => {
      photoRef.current = image;

      drawCanvas();
    };

    image.onerror = () => {
      console.error(
        "Could not load uploaded image."
      );
    };

    image.src = imageUrl;
  }, [imageUrl]);

  // ==========================================
  // REDRAW WHEN CONTENT CHANGES
  // ==========================================

  useEffect(() => {
    if (!assetsReadyRef.current) return;

    drawCanvas();
  }, [
    name,
    bounty,
    zoom,
    positionX,
    positionY,
  ]);

  // ==========================================
  // GIVE PAGE ACCESS TO CANVAS
  // ==========================================

  useEffect(() => {
    if (!canvasRef.current) return;

    onCanvasReady?.(
      canvasRef.current
    );
  }, [onCanvasReady]);

  // ==========================================
  // DRAW EVERYTHING
  // ==========================================

  const drawCanvas = () => {
    const canvas =
      canvasRef.current;

    const template =
      templateRef.current;

    if (!canvas || !template) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    // ----------------------------------------
    // CLEAR
    // ----------------------------------------

    ctx.clearRect(
      0,
      0,
      WIDTH,
      HEIGHT
    );

    // ----------------------------------------
    // TEMPLATE
    // ----------------------------------------

    ctx.drawImage(
      template,
      0,
      0,
      WIDTH,
      HEIGHT
    );

    // ----------------------------------------
    // PHOTO
    // ----------------------------------------

    if (photoRef.current) {
      drawPhoto(
        ctx,
        photoRef.current
      );
    }

    // ----------------------------------------
    // NAME
    // ----------------------------------------

    drawName(ctx);

    // ----------------------------------------
    // BOUNTY
    // ----------------------------------------

    drawBounty(ctx);
  };

  // ==========================================
  // DRAW PHOTO
  // ==========================================

  const drawPhoto = (
  ctx: CanvasRenderingContext2D,
  userImage: HTMLImageElement
) => {
  const photoX = 208;
  const photoY = 680;

  const photoWidth = 1980;
  const photoHeight = 1480;

  // Keep the template border visible
  const borderInset = 5;

  const imageX =
    photoX + borderInset;

  const imageY =
    photoY + borderInset;

  const imageWidth =
    photoWidth - borderInset * 2;

  const imageHeight =
    photoHeight - borderInset * 2;

  const imageRatio =
    userImage.width /
    userImage.height;

  const frameRatio =
    imageWidth /
    imageHeight;

  let drawWidth: number;
  let drawHeight: number;

  // ========================================
  // COVER FRAME
  // ========================================

  if (imageRatio > frameRatio) {
    drawHeight = imageHeight;

    drawWidth =
      drawHeight * imageRatio;
  } else {
    drawWidth = imageWidth;

    drawHeight =
      drawWidth / imageRatio;
  }

  // ========================================
  // ZOOM
  // ========================================

  drawWidth *= zoom;
  drawHeight *= zoom;

  // ========================================
  // POSITION
  // ========================================

  const drawX =
    imageX +
    (imageWidth - drawWidth) / 2 +
    positionX;

  const drawY =
    imageY +
    (imageHeight - drawHeight) / 2 +
    positionY;

  // ========================================
  // CLIP INSIDE PHOTO FRAME
  // ========================================

  ctx.save();

  ctx.beginPath();

  ctx.rect(
    imageX,
    imageY,
    imageWidth,
    imageHeight
  );

  ctx.clip();

  // ========================================
  // SUBTLE PRINT EFFECT
  // ========================================

  // Slightly reduce saturation.
  // Keep anime colors recognizable.
  ctx.filter =
    "saturate(78%) contrast(94%) sepia(8%)";

  ctx.globalAlpha = 0.97;

  ctx.drawImage(
    userImage,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );

  // ========================================
  // RESET EFFECTS
  // ========================================

  ctx.filter = "none";
  ctx.globalAlpha = 1;

  ctx.restore();
};

  // ==========================================
  // TEXT WIDTH
  // ==========================================

  const getTextWidth = (
    ctx: CanvasRenderingContext2D,
    text: string,
    spacing: number
  ) => {
    return (
      ctx.measureText(text).width +
      spacing *
        Math.max(
          text.length - 1,
          0
        )
    );
  };

  // ==========================================
  // DRAW CHARACTER NAME
  // ==========================================

  const drawName = (
    ctx: CanvasRenderingContext2D
  ) => {
    if (!name.trim()) return;

    const finalName =
      name.toUpperCase();

    ctx.fillStyle = "#3B2924";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const maxWidth = 1900;

    let fontSize = 370;

    const letterSpacing = 14;

    ctx.font =
      `bold ${fontSize}px CattleTrailJNL`;

    // ----------------------------------------
    // SHRINK LONG NAMES
    // ----------------------------------------

    while (
      getTextWidth(
        ctx,
        finalName,
        letterSpacing
      ) > maxWidth &&
      fontSize > 60
    ) {
      fontSize -= 2;

      ctx.font =
        `bold ${fontSize}px CattleTrailJNL`;
    }

    // ----------------------------------------
    // TOTAL WIDTH
    // ----------------------------------------

    const totalWidth =
      getTextWidth(
        ctx,
        finalName,
        letterSpacing
      );

    let currentX =
      (WIDTH - totalWidth) / 2;

    // ----------------------------------------
    // DRAW LETTERS
    // ----------------------------------------

    for (
      const char of finalName
    ) {
      const charWidth =
        ctx.measureText(char).width;

      ctx.fillText(
        char,
        currentX +
          charWidth / 2,
        2680
      );

      currentX +=
        charWidth +
        letterSpacing;
    }
  };

  // ==========================================
  // DRAW BOUNTY
  // ==========================================

  const drawBounty = (
    ctx: CanvasRenderingContext2D
  ) => {
    if (!bounty.trim()) return;

    const symbol =
      beliSymbolRef.current;

    if (!symbol) return;

    const formattedBounty =
      Number(bounty).toLocaleString(
        "en-US"
      );

    // ----------------------------------------
    // SYMBOL SIZE
    // ----------------------------------------

    const symbolWidth = 180;
    const symbolHeight = 245;

    // ----------------------------------------
    // SPACING
    // ----------------------------------------

    const gap = 28;

    const numberLetterSpacing = 8;

    // ----------------------------------------
    // MAXIMUM WIDTH
    // ----------------------------------------

    const maxGroupWidth = 2050;

    // ----------------------------------------
    // FONT
    // ----------------------------------------

    let fontSize = 205;

    const numberText =
      formattedBounty + "-";

    let numberWidth = 0;
    let totalWidth = 0;

    // ----------------------------------------
    // AUTO SHRINK LARGE BOUNTIES
    // ----------------------------------------

    while (fontSize > 70) {
      ctx.font =
        `${fontSize}px MargaretRiver`;

      numberWidth =
        getTextWidth(
          ctx,
          numberText,
          numberLetterSpacing
        );

      totalWidth =
        symbolWidth +
        gap +
        numberWidth;

      if (
        totalWidth <=
        maxGroupWidth
      ) {
        break;
      }

      fontSize -= 2;
    }

    // ----------------------------------------
    // FINAL FONT
    // ----------------------------------------

    ctx.font =
      `${fontSize}px MargaretRiver`;

    ctx.fillStyle = "#3B2924";

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";

    // ----------------------------------------
    // FINAL WIDTH
    // ----------------------------------------

    numberWidth =
      getTextWidth(
        ctx,
        numberText,
        numberLetterSpacing
      );

    totalWidth =
      symbolWidth +
      gap +
      numberWidth;

    // ----------------------------------------
    // CENTER GROUP
    // ----------------------------------------

    const startX =
      (WIDTH - totalWidth) / 2;

    const centerY = 3000;

    // ----------------------------------------
    // DRAW SYMBOL
    // ----------------------------------------

    ctx.drawImage(
      symbol,
      startX,
      centerY -
        symbolHeight / 2,
      symbolWidth,
      symbolHeight
    );

    // ----------------------------------------
    // DRAW NUMBER
    // ----------------------------------------

    let currentX =
      startX +
      symbolWidth +
      gap;

    for (
      const char of numberText
    ) {
      const charWidth =
        ctx.measureText(char).width;

      ctx.fillText(
        char,
        currentX,
        centerY
      );

      currentX +=
        charWidth +
        numberLetterSpacing;
    }
  };

  // ==========================================
  // CANVAS
  // ==========================================

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      style={{
        width: "100%",
        maxWidth: "600px",
        height: "auto",
        aspectRatio:
          "2400 / 3400",
        display: "block",
      }}
    />
  );
}