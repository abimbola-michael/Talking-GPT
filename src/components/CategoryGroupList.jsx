import CategoryGroup from "./CategoryGroup";

export default function CategoryGroupList({ categories, onCategoryClick }) {
  return (
    <ul className="w-full h-full">
      <li key={"0"}>
        <CategoryGroup
          title="Category 1"
          categories={categories}
          onCategoryClick={onCategoryClick}
        />
      </li>
    </ul>
  );
}
