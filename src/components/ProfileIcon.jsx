import AppIcon from "./AppIcon";

export default function ProfileIcon({
  url,
  asset,
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
        backgroundColor: bgColor,
        backgroundImage: url ? `url(${url})` : null,
        backgroundSize: "cover",
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {asset && <AppIcon name={asset} size={radius} />}
    </div>
  );
}
