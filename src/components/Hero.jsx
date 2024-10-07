import React from 'react';
import { Button } from "./ui";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Hero({
  textMarginTop = "5vh", // Default margin top for text content
  imageMarginTop = "5vh", // Default margin top for image
}) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = () => {
    navigate('/auth/sign-up/'); // Navigate to the auth page
  };

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-between gap-4 px-3 pb-8 pt-[60px] md:flex-row lg:gap-[72px] lg:px-0 lg:pt-[40px]">
      
      {/* Text Content with Responsive Margin */}
      <div
        className="mt-10 flex flex-col items-start gap-6 md:mt-0 md:ml-10 lg:ml-20"
        style={{ marginTop: textMarginTop }} // Apply text margin dynamically
      >
        <h1 className="font-poppins text-4xl font-bold text-[#031432] md:text-5xl md:leading-[120%]">
          विध-AI<br />
        </h1>
        <h5 className="font-poppins text-[22px] font-medium tracking-[0.44px] text-secondary">
          "Where law meets Intelligence"
        </h5>
        <Button title="Let's Go" onClick={handleButtonClick} /> {/* Add onClick handler */}
      </div>

      {/* Image/GIF with Responsive Margin */}
      <div
        className="flex justify-center items-center md:ml-10 lg:ml-20"
        style={{ marginTop: imageMarginTop }} // Apply image margin dynamically
      >
        <img
          className="custom-animate object-cover object-center rounded-full border-[4px] border-solid border-[#031432]"
          src="/img/background.gif"
          alt="Hero"
          style={{
            width: '300px',   // Circle size
            height: '300px',  // Circle size
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
}