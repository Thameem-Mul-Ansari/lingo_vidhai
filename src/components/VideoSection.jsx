import { FaRegClock } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { PiPlusCircleBold } from "react-icons/pi";
import { useRef } from "react";

export default function VideoSection() {
  const videoRef = useRef(null);

  return (
    <div className="mx-auto max-w-screen-xl p-3 pb-28 md:pb-[164px]">
      <p className="mb-3 text-center font-poppins text-[22px] font-medium text-secondary">
        Why Us?
      </p>

      <div className="relative mt-4 flex w-full items-center justify-center">
        {/* Transparent box */}
        <div className="relative w-full max-w-[800px] h-[450px] bg-white bg-opacity-30 rounded-xl flex items-center justify-center">
          {/* Video playing automatically */}
          <video
            ref={videoRef}
            className="absolute w-full h-full rounded-xl"
            src="/img/abu-the-bot.mp4"
            controls
            autoPlay
            muted
          />
        </div>
      </div>

      <div>
        <h4 className="mb-3 mt-4 text-center font-poppins text-[32px] font-semibold text-[#031432]">
          Your Friendly Virtual Companion
        </h4>
      </div>

      <div className="mt-[60px] flex flex-col items-center justify-center gap-6 md:flex-row">
        <Item title="Smart Legal Assistant" />
        <Item title="Comprehensive Legal Repository" Icon={FiCheckCircle} />
        <Item title="Tailored Legal Research Tools" Icon={PiPlusCircleBold} />
      </div>
    </div>
  );
}

function Item({
  Icon = FaRegClock,
  title = "",
  description = "",
  marginTop = "0vh", // Default margin top value
}) {
  return (
    <div
      className="flex w-max translate-y-[50%] items-center gap-3 rounded-[12px] bg-gradient-to-t from-[#65A8FB] to-[#1678F2] px-[18px] py-2 text-white md:max-w-[295px]"
      style={{ marginTop }} // Apply marginTop dynamically
    >
      <div>
        <Icon className="size-[38px]" />
      </div>
      <div className="text-center"> {/* Centering the text */}
        <h3 className="font-poppins text-lg font-medium max-w-[150px] mx-auto leading-tight"> {/* Added max-w and centered */}
          {title}
        </h3>
        <p className="font-sora text-xs">{description}</p>
      </div>
    </div>
  );
}