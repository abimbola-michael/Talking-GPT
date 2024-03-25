import React from "react";
import { primaryColor } from "../colors";

export default function AppButton({
  children,
  color = primaryColor,
  onClick,
}: {
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg px-5 py-3 mx-3"
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}
