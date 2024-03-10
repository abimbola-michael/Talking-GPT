import React, { useState } from "react";

export default function LoginInput({ placeholder, type = "text", onChange }) {
  const [value, setValue] = useState("");
  return (
    <div className="w-full relative border-lightest-tint border-[1px] rounded-md">
      {/* <span className="absolute top-[-10px] left-[10px] text-[20px]">
        {placeholder}
      </span> */}
      <input
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full border-[1px] focus:border-green-700 px-4 py-2"
      />
    </div>
  );
}
