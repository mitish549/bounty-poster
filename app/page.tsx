import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#090909",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <Image
        src="/poster/template.png"
        alt="Bounty poster template"
        width={1200}
        height={1700}
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
        }}
      />
    </main>
  );
}