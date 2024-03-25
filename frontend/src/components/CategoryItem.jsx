import PopupMenuButton from "./PopupMenuButton";
import CategoryInput from "./CategoryInput";

export default function CategoryItem({
  editCategory,
  selectedCategory,
  categoryGroup,
  category,
  onCategoryClick,
  onOptionClick,
  onSaveCategory,
}) {
  const { name, id, time, chats } = category;
  const options = ["Edit", "Delete"];
  return (
    <li
      className="flex justify-between items-center hover:bg-lightest-tint hover:rounded-sm text-white py-1 cursor-pointer"
      onClick={() => onCategoryClick(category)}
    >
      {editCategory === name ? (
        <CategoryInput
          initialValue={name}
          placeholder={"Write Category..."}
          onSave={(value) => onSaveCategory(categoryGroup, value)}
        />
      ) : (
        <p
          className="text-sm"
          style={{
            color: selectedCategory === name ? "green" : null,
          }}
        >
          {name}
        </p>
      )}
      {name !== "General" && editCategory !== name && (
        <PopupMenuButton
          size={20}
          color={"white"}
          menuOptions={options}
          onOptionClick={(option) => onOptionClick(categoryGroup, name, option)}
        />
      )}
    </li>
  );
}
