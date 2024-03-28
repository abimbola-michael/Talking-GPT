import { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import { tintLight } from "../colors";
import TextareaAutosize from "react-textarea-autosize";

// const recognition = new window.webkitSpeechRecognition();
// recognition.lang = "en-US";

export default function ChatInput({
  initialValue,
  onChange,
  onSend,
  onListen,
  isListening,
}) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialValue.length > 0) {
      setValue(initialValue);
      if (inputRef.current && document.activeElement === inputRef.current) {
        // Set the selection range to the end of the input
        inputRef.current.setSelectionRange(
          initialValue.length,
          initialValue.length
        );
      }
    }
  }, [initialValue]);
  function handleInput(event) {
    // if (event.key === "Enter") {
    //   onSend(value);
    //   setValue("");
    // }
  }

  return (
    <div className="flex items-end p-3 gap-2" onKeyDown={handleInput}>
      <div className="shrink-0">
        <ActionButton
          name={isListening ? "stop.svg" : "listen.svg"}
          onClick={onListen}
        />
      </div>

      <TextareaAutosize
        minRows={1}
        maxRows={4}
        ref={inputRef}
        className="w-full px-4 py-[6px] border border-black-lighter dark:border-white-lighter placeholder-black-lighter dark:placeholder-white-lighter focus:border-green-700 focus:outline-none rounded-3xl text-lg resize-none"
        type="text"
        placeholder="Write or speak something ..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        style={{
          backgroundColor: "#00000000",
          color: tintLight,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      />
      <div className="shrink-0">
        <ActionButton
          name={"plane.svg"}
          onClick={() => {
            onSend(value);
            setValue("");
          }}
        />
      </div>
      <div>
        {/* <div className="relative">
          <ActionButton
            // size={isListening ? 60 : 40}
            name={value.length > 0 ? "send.svg" : "record.svg"}
            onClick={() => {
              onSend(value);
              setValue("");
            }}
            // onLongClick={onLongClick}
            // onLongClickEnd={onLongClickEnd}
          />
          <div className="absolute top-[-50px] right-0">
            <ActionButton name={"voice_mode.svg"} onClick={onEnterVoice} />
          </div>
        </div> */}
      </div>
    </div>
  );
}
