import { useState } from "react";
import ActionButton from "./ActionButton";

export default function ChatInput({ onSend, onEnterVoice }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-end p-3 gap-2">
      <input
        className="w-full px-4 py-2 border border-lighter-tint-dark dark:border-lighter-tint-light rounded-full"
        type="text"
        placeholder="Message .."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{
          backgroundColor: "#00000000",
        }}
      />
      <div>
        <div className="relative">
          <ActionButton
            name={value.length > 0 ? "send.svg" : "record.svg"}
            onClick={onSend}
          />
          <div className="absolute top-[-50px] left-0">
            <ActionButton name={"listen.svg"} onClick={onEnterVoice} />
          </div>
        </div>
      </div>
    </div>
  );
}
