import React from "react";
import { FaDiscord } from "react-icons/fa";

export default function Contact() {
  const handleJoinDiscord = () => {
    window.location.href = "https://discord.gg/WXWSgx5v";
  };

  return (
    <div className="mx-auto mb-[130px] max-w-screen-xl px-3 pt-[80px] md:mb-[213px] md:pt-[148px]">
      <p className="mb-3 text-center font-poppins text-[22px] font-medium text-secondary">
        Join Our Discord Community
      </p>
      <div className="flex h-auto flex-col items-center justify-center rounded-[32px] bg-gradient-to-tl from-primary-start to-primary-end p-8 text-white md:h-[315px] md:p-4">
        <h3 className="font-poppins text-2xl font-semibold md:text-[32px] text-center">
        "Join together for a fairer, justice-driven legal community here."
        </h3>

        {/* Adding margin space between the text and button */}
        <button
          className="mt-6 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-lg font-medium text-primary-start shadow-[0px_8px_23px_0px_rgba(65,132,247,0.24)] transition hover:-rotate-3 md:px-7 md:py-4"
          onClick={handleJoinDiscord} // Call function on click
        >
          <FaDiscord className="size-6" />
          Join here
        </button>
      </div>
    </div>
  );
}