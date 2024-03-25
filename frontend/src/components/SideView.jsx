import SideHeader from "./SideHeader";
import CategoryGroupList from "./CategoryGroupList";
import ListItem from "./ListItem";
import AppIcon from "./AppIcon";
import { tintLightest } from "../colors";
import SearchInput from "./SearchInput";
import { useState } from "react";

export default function SideView({
  editCategory,
  selectedCategory,
  categoriesGroups,
  onClose,
  onCreateNew,
  onCategoryClick,
  onSaveCategory,
  onOptionClick,
}) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="flex flex-col h-screen relative bg-black">
      <SideHeader onCreateNew={onCreateNew} />
      <div className="p-3">
        <SearchInput
          placeholder={"Search Categories..."}
          onSearch={setSearchValue}
        />
      </div>
      <div className="grow">
        <CategoryGroupList
          searchValue={searchValue}
          editCategory={editCategory}
          selectedCategory={selectedCategory}
          categoriesGroups={categoriesGroups}
          onCategoryClick={onCategoryClick}
          onOptionClick={onOptionClick}
          onSaveCategory={onSaveCategory}
        />
      </div>
      {/* <ListItem
        title={"Upgrade Plan"}
        subtitle={"Get GPT-4"}
        borderColor={tintLightest}
        asset={"team.svg"}
        iconRadius={20}
      /> */}
      <ListItem
        title={"Abimbola Michael"}
        asset={"team.svg"}
        iconRadius={20}
        borderColor={tintLightest}
      />
      {/* <div className="absolute top-[18px] right-[-30px] md:hidden">
        <AppIcon name={"close.svg"} color={"white"} onClick={onClose} />
      </div> */}
    </div>
  );
}
