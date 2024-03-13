import React from "react";
import AppIcon from "./AppIcon";

export default function OpenAiLogo({ color, bgColor, radius = 20 }) {
  return (
    <div
      className={`rounded-full flex items-center justify-center`}
      style={{
        backgroundColor: bgColor ?? "white",
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <AppIcon name={"openai_logo.jpeg"} size={radius} color={color} />
    </div>
  );
}
