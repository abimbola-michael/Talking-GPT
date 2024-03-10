import React from "react";
import AppIcon from "./AppIcon";

export default function CategoryItem({
  selectedCategory,
  category: { name, id, time },
  onCategoryClick,
  onOptionClick,
  onArchive,
}) {
  return (
    <li className="flex justify-between items-center hover:bg-lightest-tint hover:rounded-sm text-white py-1">
      <p
        className="text-sm"
        onClick={onCategoryClick}
        style={{
          color: selectedCategory === name ? "green" : null,
        }}
      >
        {category}
      </p>
      <div className="inline-flex gap-3">
        <AppIcon
          name={"more.svg"}
          size={20}
          color={"white"}
          onClick={onOptionClick}
        />
        <AppIcon
          name={"archive.svg"}
          size={20}
          color={"white"}
          onClick={onArchive}
        />
      </div>
    </li>
  );
}
