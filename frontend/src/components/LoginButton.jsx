import React from "react";

export default function LoginButton({
  title,
  onClick,
  color = "white",
  bgColor = "green",
  width,
  height,
}) {
  return (
    <div
      className="flex items-center justify-center p-3 rounded-lg select-none"
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        width: width ?? "100%",
        height: height,
        color: color,
      }}
    >
      {title}
    </div>
  );
}
