import CssFilterConverter from "css-filter-converter";
import { tint } from "../colors";

export default function AppIcon({ name, url, alt, onClick, color, size = 20 }) {
  let filter = null;
  if (!color) {
    color = tint;
  }
  if (color) {
    if (color.startsWith("#")) {
      filter = CssFilterConverter.hexToFilter(color);
    } else if (color.startsWith("rgb")) {
      filter = CssFilterConverter.rgbToFilter(color);
    } else if (color.startsWith("hsl")) {
      filter = CssFilterConverter.hslToFilter(color);
    } else {
      filter = CssFilterConverter.keywordToFilter(color);
    }
  }
  return (
    <img
      src={url ? url : `assets/${name}`}
      alt={alt}
      onClick={onClick}
      style={{ width: size, height: size, filter: filter?.color }}
    />
  );
}
