import CategoryGroup from "./CategoryGroup";

export default function CategoryGroupList({
  selectedCategory,
  categoriesGroups,
  onCategoryClick,
}) {
  return (
    <ul className="w-full h-full">
      {categoriesGroups ? (
        categoriesGroups?.map((categoryGroup) => (
          <CategoryGroup
            key={categoryGroup.title}
            selectedCategory={selectedCategory}
            categoryGroup={categoryGroup}
            onCategoryClick={onCategoryClick(category)}
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
