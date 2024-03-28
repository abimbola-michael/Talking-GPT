import React from "react";
import { primaryColor, tint } from "../colors";

export default function AppButton({
  children,
  bgColor = primaryColor,
  color = tint,
  onClick,
}: {
  onClick: () => void;
  children: React.ReactNode;
  bgColor?: string;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg px-5 py-2"
      style={{ backgroundColor: bgColor, color: color }}
    >
      {children}
    </button>
  );
}
