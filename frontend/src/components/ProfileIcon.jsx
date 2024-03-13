import AppIcon from "./AppIcon";

export default function ProfileIcon({
  url,
  radius = 25,
  borderSize,
  borderColor,
  bgColor,
  bgImage,
}) {
  if (borderColor && !borderSize) {
    borderSize = 1;
  }
  return (
    <div
      className={`rounded-full ${
        borderSize ? `border-[${borderSize}px]` : ""
      } ${borderColor ? `border-[${borderColor}]` : ""} bg-center`}
      style={{
        backgroundColor: bgColor || "transparent",
        backgroundImage: url ? `url(assets/${url})` : "none",
        backgroundSize: "cover",
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    ></div>
  );
}
