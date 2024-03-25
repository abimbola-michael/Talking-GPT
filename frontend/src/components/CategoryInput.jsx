import { useEffect, useRef, useState } from "react";
import { onTint, tint } from "../colors";
import AppIcon from "./AppIcon";

export default function CategoryInput({ initialValue, placeholder, onSave }) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  function reset() {
    setValue("");
  }
  function handleInput(event) {
    if (event.key === "Enter") {
      onSave(value);
      setValue("");
    }
  }

  return (
    <div className="w-full flex gap-2 items-center" onKeyDown={handleInput}>
      <div
        className="w-full flex items-center gap-2 relative border-lightest-tint placeholder-black-lighter dark:placeholder-white-lighter text-sm"
        style={{ color: tint }}
      >
        <input
          ref={inputRef}
          value={value}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent rounded-md border-[1px] focus:border-green-700 pl-2 pr-7 py-1 h-8 line-clamp-1"
        />
        {value.length > 0 && (
          <div className="flex items-center absolute top-0 bottom-0 right-2">
            <AppIcon name="close.svg" color={tint} size={18} onClick={reset} />
          </div>
        )}
      </div>
      {value.length > 0 && (
        <div
          className="shrink-0 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer"
          style={{ backgroundColor: tint }}
        >
          <AppIcon
            name="ok_check.svg"
            color={onTint}
            size={18}
            onClick={() => {
              if (value.length === 0) return;
              onSave(value);
              reset();
            }}
          />
        </div>
      )}
    </div>
  );
}
