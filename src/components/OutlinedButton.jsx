import AppIcon from "./AppIcon";

export default function OutlinedButton({
  title,
  subtitle,
  onClick,
  color,
  icon,
}) {
  return (
    <div
      className="w-full flex rounded-lg items-center justify-start border-[1px] border-lightest-tint px-3 py-2 gap-3 select-none"
      onClick={onClick}
      style={{}}
    >
      {icon && <AppIcon name={icon} size={24} />}
      <div className="w-full flex flex-col items-start">
        {title && <p className="text-md line-clamp-1">{title}</p>}
        {subtitle && (
          <p className="text-md text-lighter-tint line-clamp-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
