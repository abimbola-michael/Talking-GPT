import { useState } from "react";
import ActionButton from "./ActionButton";
import { tintLight } from "../colors";
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
  // const [isLongClick, setisLongClick] = useState(false);

  // recognition.onstart = () => {};

  // recognition.onresult = (event) => {
  //   const transcript = event.results[0][0].transcript;
  //   if (transcript.length > 0) {
  //     setValue((value) => `${value} ${transcript}`);
  //   }
  // };

  // recognition.onend = () => {};

  // const startListening = () => {
  //   recognition.start();
  //   setIsListening(true);
  //   vibrate();
  // };

  // const stopListening = () => {
  //   recognition.stop();
  //   setIsListening(false);
  //   vibrate();
  // };

  // function vibrate() {
  //   if (navigator.vibrate) {
  //     navigator.vibrate(100);
  //   }
  // }
  function handleInput(event) {
    if (event.key === "Enter") {
      onSend(value);
      setValue("");
    }
  }

  return (
    <div className="flex items-end p-3 gap-2" onKeyDown={handleInput}>
      <div className="shrink-0">
        <ActionButton
          name={isListening ? "stop.svg" : "listen.svg"}
          onClick={onListen}
        />
      </div>

      <input
        className="w-full px-4 py-2 border border-black-lighter dark:border-white-lighter placeholder-black-lighter dark:placeholder-white-lighter focus:border-green-700 focus:outline-none rounded-full line-clamp-5"
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
        }}
      />
      <div className="shrink-0">
        <ActionButton
          name={"send.svg"}
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
