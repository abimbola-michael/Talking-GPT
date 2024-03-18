import { useEffect, useRef } from "react";
import { onTint, tint } from "../colors";
import AppIcon from "./AppIcon";

export default function ActionButton({
  size = 40,
  name,
  onClick,
  onLongClick,
  onLongClickEnd,
  bgColor,
}) {
  const longPressTimeout = useRef();
  const longPress = useRef(false);
  const handleMouseDown = () => {
    // Set a timeout for the long press event
    const timeout = setTimeout(() => {
      onLongClick?.();
      longPress.current = true;
      // Your long press action goes here
    }, 1000); // Adjust the duration as needed
    //setLongPressTimeout(timeout);
    longPressTimeout.current = timeout;
  };

  const handleMouseUp = () => {
    // Clear the timeout when button is released
    clearTimeout(longPressTimeout.current);
    onLongClickEnd?.();
  };

  return (
    <div
      className="flex rounded-full items-center justify-center"
      onClick={longPress.current ? null : onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        backgroundColor: bgColor ?? tint,
        width: size,
        height: size,
      }}
    >
      <AppIcon name={name} size={15} color={onTint} />
    </div>
  );
}
