import React from "react";
import { tint, tintLightest, appBgColor } from "../colors";

export default function PopupMenu({ options, onOptionClick, bgColor }) {
  return (
    <ul
      className="flex flex-col items-start p-3 rounded-md shadow-md absolute z-10 top-4 right-0 mt-1 min-w-[120px] bg-white dark:bg-black cursor-pointer"
      style={{ color: tint, backgroundColor: bgColor || tintLightest }}
    >
      {options.map((option, index) => (
        <li
          key={index}
          className="py-1 hover:text-green-700"
          onClick={() => onOptionClick(option, index)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
