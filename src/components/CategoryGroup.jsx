import React from "react";
import CategoryItem from "./CategoryItem";

export default function CategoryGroup({
  selectedCategory,
  categoryGroup: { title, categories },
  onCategoryClick,
}) {
  return (
    <li className="flex flex-col gap-2 px-3 py-2">
      <p className="font-semibold text-white">{title}</p>
      <ul className="flex flex-col">
        {categories?.map((category) => (
          <CategoryItem
            key={category.id}
            selectedCategory={selectedCategory}
            category={category}
            onCategoryClick={onCategoryClick(category)}
          />
        ))}
      </ul>
    </li>
  );
}
