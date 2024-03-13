import { useState } from "react";
import ActionButton from "./ActionButton";
import { tintLight } from "../colors";

export default function ChatInput({
  message = "",
  onSend,
  onSpeak,
  onSpeakEnd,
  onEnterVoice,
}) {
  const [value, setValue] = useState(message);
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="flex items-end p-3 gap-2">
      <input
        className="w-full px-4 py-2 border border-black-lighter dark:border-white-lighter placeholder-black-lighter dark:placeholder-white-lighter focus:border-green-700 focus:outline-none rounded-full"
        type="text"
        placeholder="Message .."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{
          backgroundColor: "#00000000",
          color: tintLight,
        }}
      />
      {/* {isListening ? (
        <div className="flex flex-col items-center gap-2">
          <div className={`listening-icon ${isListening ? "listening" : ""}`} />
          <div>Listening...</div>
        </div>
      ) : (
        <input
          className="w-full px-4 py-2 border border-black-lighter dark:border-white-lighter placeholder-black-lighter dark:placeholder-white-lighter focus:border-green-700 focus:outline-none rounded-full"
          type="text"
          placeholder="Message .."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          style={{
            backgroundColor: "#00000000",
            color: tintLight,
          }}
        />
      )} */}
      <div>
        <div className="relative">
          <ActionButton
            size={isListening ? 60 : 40}
            name={value.length > 0 ? "send.svg" : "record.svg"}
            onClick={() => {
              onSend(value);
              setValue("");
            }}
            onLongClick={() => {
              setIsListening(true);
              onSpeak();
            }}
            onLongClickEnd={() => {
              setIsListening(false);
              onSpeakEnd();
            }}
          />
          <div className="absolute top-[-50px] right-0">
            <ActionButton name={"listen.svg"} onClick={onEnterVoice} />
          </div>
        </div>
      </div>
    </div>
  );
}
