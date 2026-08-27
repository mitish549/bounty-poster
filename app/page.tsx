"use client";

import { useState } from "react";

import BountyPosterCanvas from "./components/BountyPosterCanvas";
import ImageUploader from "./components/ImageUploader";

export default function Home() {
  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  const [name, setName] =
    useState("");

  const [bounty, setBounty] =
    useState("");

  // ==========================================
  // PHOTO CONTROLS
  // ==========================================

  const [zoom, setZoom] =
    useState(1);

  const [positionX, setPositionX] =
    useState(0);

  const [positionY, setPositionY] =
    useState(0);

  // ==========================================
  // CANVAS
  // ==========================================

  const [posterCanvas, setPosterCanvas] =
    useState<HTMLCanvasElement | null>(
      null
    );

  // ==========================================
  // RESET PHOTO
  // ==========================================

  const resetPhoto = () => {
    setZoom(1);
    setPositionX(0);
    setPositionY(0);
  };

  // ==========================================
  // DOWNLOAD POSTER
  // ==========================================

  const downloadPoster = () => {
    if (!posterCanvas) return;

    const link =
      document.createElement("a");

    // ----------------------------------------
    // FILE NAME
    // ----------------------------------------

    const safeName = name.trim()
      ? name
          .toUpperCase()
          .replace(
            /[^A-Z0-9]+/g,
            "-"
          )
          .replace(
            /^-|-$/g,
            ""
          )
      : "WANTED-POSTER";

    link.download =
      `${safeName}-WANTED-POSTER.png`;

    // ----------------------------------------
    // FULL RESOLUTION PNG
    // ----------------------------------------

    link.href =
      posterCanvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#090909",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        gap: "60px",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* =====================================
          LEFT CONTROLS
      ====================================== */}

      <section
        style={{
          width: "300px",
          display: "flex",
          flexDirection:
            "column",
          gap: "20px",
        }}
      >
        {/* ===================================
            UPLOAD PHOTO
        ==================================== */}

        <ImageUploader
          onImageSelect={(url) => {
            setImageUrl(url);
            resetPhoto();
          }}
        />

        {/* ===================================
            CHARACTER NAME
        ==================================== */}

        <div>
          <label
            style={{
              display: "block",
              color: "#ffffff",
              marginBottom: "8px",
              fontWeight: 700,
            }}
          >
            Character Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            placeholder="Enter character name"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "6px",
              border:
                "1px solid #555",
              background:
                "#ffffff",
              color: "#000000",
              outline: "none",
              boxSizing:
                "border-box",
            }}
          />
        </div>

        {/* ===================================
            BOUNTY
        ==================================== */}

        <div>
          <label
            style={{
              display: "block",
              color: "#ffffff",
              marginBottom: "8px",
              fontWeight: 700,
            }}
          >
            Bounty
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={bounty}
            onChange={(event) => {
              const numbersOnly =
                event.target.value.replace(
                  /\D/g,
                  ""
                );

              setBounty(
                numbersOnly
              );
            }}
            placeholder="Enter bounty"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "6px",
              border:
                "1px solid #555",
              background:
                "#ffffff",
              color: "#000000",
              outline: "none",
              boxSizing:
                "border-box",
            }}
          />
        </div>

        {/* ===================================
            PHOTO CONTROLS
        ==================================== */}

        {imageUrl && (
          <div
            style={{
              marginTop: "5px",
              paddingTop: "15px",
              borderTop:
                "1px solid #333",
            }}
          >
            <h3
              style={{
                color: "#ffffff",
                margin:
                  "0 0 15px",
                fontSize: "16px",
              }}
            >
              PHOTO POSITION
            </h3>

            {/* =================================
                ZOOM
            ================================== */}

            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontSize: "14px",
                marginBottom:
                  "5px",
              }}
            >
              Zoom
            </label>

            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(event) =>
                setZoom(
                  Number(
                    event.target.value
                  )
                )
              }
              style={{
                width: "100%",
              }}
            />

            {/* =================================
                HORIZONTAL
            ================================== */}

            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontSize: "14px",
                marginTop:
                  "12px",
                marginBottom:
                  "5px",
              }}
            >
              Horizontal
            </label>

            <input
              type="range"
              min="-500"
              max="500"
              step="1"
              value={positionX}
              onChange={(event) =>
                setPositionX(
                  Number(
                    event.target.value
                  )
                )
              }
              style={{
                width: "100%",
              }}
            />

            {/* =================================
                VERTICAL
            ================================== */}

            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontSize: "14px",
                marginTop:
                  "12px",
                marginBottom:
                  "5px",
              }}
            >
              Vertical
            </label>

            <input
              type="range"
              min="-500"
              max="500"
              step="1"
              value={positionY}
              onChange={(event) =>
                setPositionY(
                  Number(
                    event.target.value
                  )
                )
              }
              style={{
                width: "100%",
              }}
            />

            {/* =================================
                RESET
            ================================== */}

            <button
              type="button"
              onClick={
                resetPhoto
              }
              style={{
                marginTop:
                  "15px",
                width: "100%",
                padding: "10px",
                border:
                  "1px solid #555",
                borderRadius:
                  "6px",
                background:
                  "#222222",
                color:
                  "#ffffff",
                cursor:
                  "pointer",
                fontWeight: 700,
              }}
            >
              RESET PHOTO
            </button>
          </div>
        )}

        {/* ===================================
            DOWNLOAD
        ==================================== */}

        <button
          type="button"
          onClick={
            downloadPoster
          }
          disabled={!posterCanvas}
          style={{
            marginTop: "5px",
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: "6px",
            background:
              "#c90000",
            color:
              "#ffffff",
            cursor:
              posterCanvas
                ? "pointer"
                : "not-allowed",
            fontWeight: 700,
            opacity:
              posterCanvas
                ? 1
                : 0.5,
          }}
        >
          DOWNLOAD POSTER
        </button>
      </section>

      {/* =====================================
          POSTER
      ====================================== */}

      <section>
        <BountyPosterCanvas
          imageUrl={imageUrl}
          name={name}
          bounty={bounty}
          zoom={zoom}
          positionX={positionX}
          positionY={positionY}
          onCanvasReady={
            setPosterCanvas
          }
        />
      </section>
    </main>
  );
}