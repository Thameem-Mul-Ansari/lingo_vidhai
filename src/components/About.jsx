import React from "react";

export default function About() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-5 px-3 pt-28 md:flex-row md:pb-[145px] lg:gap-20 lg:px-0 lg:pt-[220px]">
      <div className="max-h-[495px] max-w-[586px]">
        <img
          className="custom-animate size-[85%] object-contain md:size-full"
          src="/img/legal.jpg"
          alt="About"
        />
      </div>

      <div className="flex flex-col items-start gap-4">
        <h1 className="max-w-[485px] font-poppins text-[32px] font-semibold leading-normal text-[#031432]">
          About Us
        </h1>
        <h5 className="font-poppins text-[22px] font-medium tracking-[0.44px] text-secondary">
          "Where data meets deliberation, and AI fuels decisions."
        </h5>
        <p className="mb-4 max-w-[485px] text-para text-justify">
        VidhAI is an AI-powered legal platform designed to streamline and enhance legal research and decision-making for commercial courts and law enforcement. By combining the latest in artificial intelligence with a vast repository of legal data, VidhAI provides tailored insights, predictive analytics, and real-time legal recommendations. Our mission is to empower legal professionals with tools that simplify complex legal processes, ensure accuracy, and promote faster resolutions, all while maintaining ethical transparency and multilingual support for a diverse range of legal systems.
        </p>
      </div>
    </div>
  );
}