import ProfileIcon from "./ProfileIcon";

export default function ListItem({
  title,
  subtitle,
  asset,
  url,
  iconRadius,
  borderSize,
  borderColor,
  onClick,
}) {
  return (
    <div className="flex items-center" onClick={onClick}>
      {(asset || url) && (
        <ProfileIcon
          asset={asset}
          url={url}
          radius={iconRadius}
          borderSize={borderSize}
          borderColor={borderColor}
        />
      )}
      <div className="flex flex-col">
        <p className="font-bold">{title}</p>
        {subtitle && <p className="text-stone-700">{subtitle}</p>}
      </div>
    </div>
  );
}
