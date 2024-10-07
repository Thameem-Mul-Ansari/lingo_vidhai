import React from "react";
import { ServiceCard } from "./ui";

export default function ServiceCards() {
  return (
    <div
      style={{ marginTop: '80px' }} // Inline style as a fallback
      className="mx-auto mt-[50px] flex max-w-screen-xl flex-wrap items-center justify-center gap-9 pb-[80px] md:pb-[164px]"
    >
      <ServiceCard title="AI-Driven Legal Precedent Explorer" imgSrc="/img/bg.png" />
      <ServiceCard title="Empowering Legal Awareness for Citizens" imgSrc="/img/bg.png" />
      <ServiceCard title="Multilingual Legal Document Analyzer" imgSrc="/img/bg.png" />
      <ServiceCard title="Legal Framework and Tribunal Dataset" imgSrc="/img/bg.png" />
      <ServiceCard title="Tailored Legal Research Dashboard" imgSrc="/img/bg.png" />
      <ServiceCard title="Ethical AI Oversight Module" imgSrc="/img/bg.png" />
    </div>
  );
}