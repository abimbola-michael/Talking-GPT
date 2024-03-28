import { useState } from "react";
import { appBgColor, tint } from "../colors";

export default function LoginInput({ placeholder, type = "text", onChange }) {
  const [value, setValue] = useState("");
  function getType() {
    switch (placeholder) {
      case "Email":
        return "email";
      case "Password":
        return "password";
      default:
        return "text";
    }
  }
  return (
    <div className="w-full relative rounded-md" style={{ color: tint }}>
      {/* <span className="absolute top-[-10px] left-[10px] text-[20px]">
        {placeholder}
      </span> */}
      <input
        type={getType()}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full rounded-md border-[1px] focus:border-green-700 px-4 py-2"
        style={{ backgroundColor: appBgColor }}
      />
    </div>
  );
}
