import OpenAiLogo from "./OpenAiLogo";
import AppIcon from "./AppIcon";

export default function SideHeader({ onCreateNew }) {
  return (
    <div className="flex justify-between items-center text-white p-3">
      <div className="inline-flex items-center gap-2">
        <OpenAiLogo radius={15} color={"black"} />
        <span>New category</span>
      </div>
      <AppIcon name={"write.svg"} color={"white"} onClick={onCreateNew} />
    </div>
  );
}
