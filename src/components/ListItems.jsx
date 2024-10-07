import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { PiPlusCircleBold } from "react-icons/pi";

export default function ListItems() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-4 px-3 md:gap-7">
      <Item title="Smart Legal Assistant" marginTop="5vh" />
      <Item title="Comprehensive Legal Repository" Icon={FiCheckCircle} marginTop="5vh" />
      <Item title="Tailored Legal Research Tools" Icon={PiPlusCircleBold} marginTop="5vh" />
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