import React from "react";
import AppIcon from "./AppIcon";

export default function CategoryItem({
  category,
  onCategoryClick,
  onOptionClick,
  onArchive,
}) {
  return (
    <div className="flex justify-between items-center hover:bg-lightest-white hover:rounded-sm">
      <p className="text-sm" onClick={onCategoryClick}>
        {category}
      </p>
      <div className="inline-flex gap-1">
        <AppIcon name={"more.svg"} size={15} onClick={onOptionClick} />
        <AppIcon name={"archive.svg"} size={15} onClick={onArchive} />
      </div>
    </div>
  );
}
