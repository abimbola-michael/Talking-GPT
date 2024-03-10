import SideHeader from "./SideHeader";
import CategoryGroupList from "./CategoryGroupList";
import ListItem from "./ListItem";
import AppIcon from "./AppIcon";

export default function SideView({
  selectedCategory,
  categoriesGroups,
  onClose,
  onCreateNew,
  onCategoryClick,
}) {
  return (
    <div className="flex flex-col h-screen relative bg-black">
      <SideHeader onCreateNew={onCreateNew} />
      <div className="grow">
        <CategoryGroupList
          selectedCategory={selectedCategory}
          categoriesGroups={categoriesGroups}
          onCategoryClick={onCategoryClick}
        />
      </div>
      <ListItem
        title={"Upgrade Plan"}
        subtitle={"Get GPT-4"}
        borderColor={"black"}
        asset={"team.svg"}
      />
      <ListItem title={"Abimbola Michael"} asset={"team.svg"} />
      <div className="absolute top-[18px] right-[-30px] md:hidden">
        <AppIcon name={"close.svg"} color={"white"} onClick={onClose} />
      </div>
    </div>
  );
}
