import SideHeader from "./SideHeader";
import CategoryGroupList from "./CategoryGroupList";
import ListItem from "./ListItem";
import AppIcon from "./AppIcon";

export default function SideView({
  categories,
  onClose,
  onCreateNew,
  onCategoryClick,
}) {
  return (
    <div className="flex flex-col h-screen relative bg-black">
      <SideHeader onCreateNew={onCreateNew} />
      <div className="grow">
        <CategoryGroupList
          categories={categories}
          onCategoryClick={onCategoryClick}
        />
      </div>
      <ListItem
        title={"Upgrade Plan"}
        subtitle={"Get GPT-4"}
        borderColor={"black"}
      />
      <ListItem title={"Abimbola Michael"} />
      <div className="absolute top-[15px] right-[-30px] md:hidden">
        <AppIcon name={"close.svg"} onClick={onClose} />
      </div>
    </div>
  );
}
