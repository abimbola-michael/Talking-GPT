import { useState } from "react";
import { onTint, tint } from "../colors";
import AppIcon from "./AppIcon";

export default function SearchInput({
  placeholder,
  onSearch,
  // onSearchTop,
  // onSearchBottom,
}) {
  const [value, setValue] = useState("");
  function reset() {
    setValue("");
  }
  return (
    <div className="w-full flex gap-2 items-center">
      <div
        className="w-full relative border-lightest-tint placeholder-black-lighter dark:placeholder-white-lighter"
        style={{ color: tint }}
      >
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          placeholder={placeholder}
          className="w-full bg-transparent rounded-md border-[1px] focus:border-green-700 pl-4 pr-9 py-1 h-9 line-clamp-1"
        />
        {value.length > 0 && (
          <div className="flex items-center h-9 absolute top-0 bottom-0 right-2">
            <AppIcon name="close.svg" color={tint} size={18} onClick={reset} />
          </div>
        )}
      </div>
      {value.length > 0 && (
        <div
          className="shrink-0 h-9 w-9 flex items-center justify-center rounded-md"
          style={{ backgroundColor: tint }}
        >
          <AppIcon
            name="send.svg"
            color={onTint}
            size={18}
            onClick={() => onSearch(value)}
          />
        </div>
      )}
      {/* {value.length > 0 && (
        <div
          className="shrink-0 h-9 w-9 flex items-center justify-center rounded-md"
          style={{ backgroundColor: tint }}
        >
          <AppIcon
            name="chevron_up.svg"
            color={onTint}
            size={18}
            onClick={() => onSearchTop(value)}
          />
        </div>
      )} */}
      {/* {value.length > 0 && (
        <div
          className="shrink-0 h-9 w-9 flex items-center justify-center rounded-md"
          style={{ backgroundColor: tint }}
        >
          <AppIcon
            name="chevron_down.svg"
            color={onTint}
            size={18}
            onClick={() => onSearchBottom(value)}
          />
        </div>
      )} */}
    </div>
  );
}
