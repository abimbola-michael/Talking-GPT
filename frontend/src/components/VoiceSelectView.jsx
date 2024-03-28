import React, { useState } from "react";
import { primaryColor, tint } from "../colors";
import AppButton from "./AppButton";
export default function VoiceSelectView({
  voices,
  currentVoice,
  setCurrentVoice,
  setShowVoiceSelect,
  speakMessage,
}) {
  console.log("voices", voices, currentVoice, setShowVoiceSelect, speakMessage);
  const [selVoice, setSelVoice] = useState(currentVoice);
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4 bg-black-lighter"
      onClick={() => setShowVoiceSelect(false)}
    >
      <div
        className="w-[50%] h-[50%] flex flex-col gap-3 items-center bg-black rounded-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-lg" style={{ color: tint }}>
          Select voice
        </h2>
        <ul className="flex flex-col h-full gap-2 overflow-y-auto">
          {voices?.map((voice) => {
            return (
              <p
                className="text-md py-2 cursor-pointer"
                key={voice.name}
                style={{ color: selVoice === voice ? primaryColor : tint }}
                onClick={() => {
                  setSelVoice(voice);
                  speakMessage(voice);
                }}
              >
                {voice.name}
              </p>
            );
          })}
        </ul>
        <AppButton
          color="white"
          onClick={() => {
            setCurrentVoice(selVoice);
            setShowVoiceSelect(false);
          }}
        >
          Save
        </AppButton>
      </div>
    </div>
  );
}
