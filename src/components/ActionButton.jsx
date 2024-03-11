import { onTint, tint } from "../colors";
import AppIcon from "./AppIcon";

export default function ActionButton({ name, onClick, bgColor }) {
  return (
    <div
      className="flex rounded-full items-center justify-center"
      onClick={onClick}
      style={{
        backgroundColor: bgColor ?? tint,
        width: 40,
        height: 40,
      }}
    >
      <AppIcon name={name} size={15} color={onTint} />
    </div>
  );
}
