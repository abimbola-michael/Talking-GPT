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
    <div className="flex items-center gap-2 px-3 py-1" onClick={onClick}>
      {(asset || url) && (
        <ProfileIcon
          asset={asset}
          url={url}
          radius={iconRadius}
          borderSize={borderSize}
          borderColor={borderColor}
        />
      )}
      <div className="flex flex-col text-white py-2">
        <p className="font-bold text-sm">{title}</p>
        {subtitle && <p className="text-white text-sm">{subtitle}</p>}
      </div>
    </div>
  );
}
