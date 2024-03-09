import React from "react";
import CategoryItem from "./CategoryItem";

export default function CategoryGroup({ title, categories, onCategoryClick }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-slate-800">{title}</p>
      <ul className="flex flex-col">
        {categories?.map((category, index) => (
          <li key={index}>
            <CategoryItem
              category={category}
              onCategoryClick={onCategoryClick(category)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
