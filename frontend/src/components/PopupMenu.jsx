import React from "react";
import { tint } from "../colors";
import { isDarkMode } from "../utils/utils";

export default function PopupMenu({ options, onOptionClick }) {
  return (
    <ul
      className="flex flex-col items-start p-3 rounded-md shadow-md absolute z-10 top-0 right-0 mt-1 w-40 bg-white dark:bg-black cursor-pointer"
      style={{ color: tint }}
    >
      {options.map((option, index) => (
        <li
          key={index}
          className="py-1 hover:text-green-700"
          onClick={() => onOptionClick(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
