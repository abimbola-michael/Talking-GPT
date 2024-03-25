import CategoryGroupItem from "./CategoryGroupItem";

export default function CategoryGroupList({
  searchValue,
  editCategory,
  selectedCategory,
  categoriesGroups,
  onCategoryClick,
  onOptionClick,
  onSaveCategory,
}) {
  return (
    <ul className="w-full h-full">
      {categoriesGroups ? (
        categoriesGroups?.map((categoryGroup) => (
          <CategoryGroupItem
            key={categoryGroup.title}
            searchValue={searchValue}
            editCategory={editCategory}
            selectedCategory={selectedCategory}
            categoryGroup={categoryGroup}
            onCategoryClick={onCategoryClick}
            onSaveCategory={onSaveCategory}
            onOptionClick={onOptionClick}
          />
        ))
      ) : (
        <div className="h-full flex justify-center items-center text-white text-bold text-sm">
          No chats
        </div>
      )}
    </ul>
  );
}
