import React from "react";
import AppIcon from "./AppIcon";

export default function Header({ onLeftClick, onMiddleClick, onRightClick }) {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2">
      <div className="md:hidden">
        <AppIcon name="drawer_toggle.svg" onClick={onLeftClick} />
      </div>
      <div className="inline-flex items-center gap-1" onClick={onMiddleClick}>
        <span className="font-bold text-lg dark:text-white">Talking GPT</span>{" "}
        {/* <span className="text-stone-700">3.5</span>
        <AppIcon name="arrow_down.svg" size={15} onClick={onRightClick} /> */}
      </div>
      <AppIcon name="write.svg" onClick={onRightClick} />
    </div>
  );
}
