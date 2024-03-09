import React from "react";
import AppIcon from "./AppIcon";

export default function OpenAiLogo({ color, bgColor, radius }) {
  return (
    <div
      className={`w-[40px] h-[40px] rounded-[20px] bg-${
        bgColor ?? "white"
      } flex items-center justify-center`}
    >
      <AppIcon name={"openai_logo.jpeg"} size={20} color={"white"} />
    </div>
  );
}
