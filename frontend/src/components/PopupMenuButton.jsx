import React from "react";
import AppIcon from "./AppIcon";
import PopupMenu from "./PopupMenu";

export default function PopupMenuButton({
  icon,
  size,
  color,
  menuOptions,
  onOptionClick,
}) {
  return (
    <div className="relative group">
      <AppIcon name={icon || "more.svg"} size={size} color={color} />
      <div className="hidden group-hover:block">
        <PopupMenu options={menuOptions} onOptionClick={onOptionClick} />
      </div>
    </div>
  );
}
