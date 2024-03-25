import CssFilterConverter from "css-filter-converter";
import { tint } from "../colors";
import { ColorToFilterResult } from "css-filter-converter/lib/shared/types/result";
import React from "react";

export default function AppIcon({
  name,
  url,
  alt,
  onClick,
  color,
  size = 20,
  useTint = true,
}: {
  name: string;
  url?: string;
  alt?: string;
  onClick?: () => void;
  color?: string | undefined;
  size?: number;
  useTint?: boolean;
}) {
  let filter: ColorToFilterResult<string | null> | undefined = undefined;
  if (!color && useTint) {
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
      style={{ width: size, height: size, filter: filter?.color ?? undefined }}
    />
  );
}
