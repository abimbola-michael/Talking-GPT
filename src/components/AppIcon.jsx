import React from "react";

export default function AppIcon({ name, url, alt, onClick, color, size = 20 }) {
  return (
    <div className="flex item-center">
      <img
        src={url ? url : `assets/${name}`}
        alt={alt}
        onClick={onClick}
        style={{ width: size, height: size, color }}
      />
    </div>
  );
}
