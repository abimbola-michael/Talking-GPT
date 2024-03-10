import AppIcon from "./AppIcon";

export default function ProfileIcon({
  url,
  asset,
  radius = 25,
  borderSize,
  borderColor = "black",
  bgColor,
}) {
  return (
    <div
      className={`rounded-full ${borderSize ? `border-${borderSize}` : ""} ${
        borderColor ? `border-${borderColor}` : ""
      }`}
      style={{
        backgroundColor: bgColor,
        backgroundImage: url ? `url(${url})` : null,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {asset && <AppIcon name={asset} size={radius} />}
    </div>
  );
}
