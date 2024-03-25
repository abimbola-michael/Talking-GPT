import { useState } from "react";
import AppIcon from "./AppIcon";
import CategoryItem from "./CategoryItem";

export default function CategoryGroupItem({
  searchValue,
  editCategory,
  selectedCategory,
  categoryGroup,
  onCategoryClick,
  onOptionClick,
  onSaveCategory,
}) {
  const [opened, setOpened] = useState(true);
  const { title, categories } = categoryGroup;
  const chatCategories =
    searchValue.length > 0
      ? categories.filter((cat) => cat.name.includes(searchValue))
      : categories;
  function toggleOpen() {
    setOpened((opened) => !opened);
  }
  return (
    <li className="flex flex-col gap-2 px-3 py-2">
      <div className="flex justify-between items-center gap-2">
        <h2 className="font-semibold text-white">{title}</h2>
        <AppIcon
          size={24}
          name={!opened ? "chevron_down.svg" : "chevron_up.svg"}
          onClick={toggleOpen}
        />
      </div>
      {opened && (
        <ul className="flex flex-col">
          {chatCategories?.map((category) => (
            <CategoryItem
              key={category.id}
              editCategory={editCategory}
              selectedCategory={selectedCategory}
              categoryGroup={categoryGroup}
              category={category}
              onCategoryClick={onCategoryClick}
              onOptionClick={onOptionClick}
              onSaveCategory={onSaveCategory}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
