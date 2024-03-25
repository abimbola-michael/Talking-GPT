import React from "react";
import { tint } from "../colors";

export default function LoadingSignal() {
  return (
    <div
      className="w-2 h-4 rounded-md animate-spin"
      style={{ backgroundColor: tint }}
    ></div>
  );
}
