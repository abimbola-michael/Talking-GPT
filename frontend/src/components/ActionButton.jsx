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
  const handleMouseDown = () => {
    // Set a timeout for the long press event
    const timeout = setTimeout(() => {
      onLongClick();
      // Your long press action goes here
    }, 1000); // Adjust the duration as needed
    //setLongPressTimeout(timeout);
    longPressTimeout.current = timeout;
  };

  const handleMouseUp = () => {
    // Clear the timeout when button is released
    clearTimeout(longPressTimeout.current);
    onLongClickEnd();
  };
  // useEffect(() => {
  //   return () => {
  //     clear();
  //   };
  // }, []);
  // function start() {
  //   clear();
  //   const timer = setTimeout(() => {
  //     onLongClick();
  //     clear();
  //   }, 1000);
  //   timerRef.current = timer;
  // }
  // function clear() {
  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current);
  //     timerRef.current = null;
  //   }
  // }
  // function stop() {
  //   onLongClickEnd();
  //   clear();
  // }
  return (
    <div
      className="flex rounded-full items-center justify-center"
      onClick={onClick}
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
