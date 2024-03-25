import { useRef, useState } from "react";
import { onTint, tint } from "../colors";
import AppIcon from "./AppIcon";
import React from "react";

export default function ActionButton({
  size = 40,
  name,
  onClick,
  onLongClick,
  onLongClickEnd,
  bgColor,
}: {
  size?: number;
  name: string;
  onClick?: () => void;
  onLongClick?: () => void;
  onLongClickEnd?: () => void;
  bgColor?: string;
}) {
  const [isLongClick, setIsLongClick] = useState(false);
  const longPressTimeout = useRef<number>();
  const longPress = useRef(false);
  const handleMouseDown = () => {
    // Set a timeout for the long press event
    const timeout = setTimeout(() => {
      onLongClick?.();
      setIsLongClick(true);
      longPress.current = true;
      // Your long press action goes here
    }, 1000); // Adjust the duration as needed
    //setLongPressTimeout(timeout);
    longPressTimeout.current = timeout;
  };

  const handleMouseUp = () => {
    // Clear the timeout when button is released
    clearTimeout(longPressTimeout.current);
    setIsLongClick(false);
    onLongClickEnd?.();
  };

  return (
    <div
      className="flex rounded-full items-center justify-center"
      onClick={longPress.current ? undefined : onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        backgroundColor: bgColor ?? tint,
        width: isLongClick ? size + 20 : size,
        height: isLongClick ? size + 20 : size,
      }}
    >
      <AppIcon name={name} size={15} color={onTint} />
    </div>
  );
}
