import React from "react";
import ProfileIcon from "./ProfileIcon";
import VoiceModeControls from "./VoiceModeControls";
import ActionButton from "./ActionButton";

export default function VoiceModeView({ onChangeToChat, onRecord }) {
  return (
    <div className="h-full">
      <div className="flex flex-col items-center mt-[20%]">
        <ProfileIcon
          asset={"microsoft_icon.png"}
          radius={70}
          bgColor={"green"}
        />
        <h2 className="font-bold text-lg">Hotshot</h2>
        <p className="text-md">{"What will you like me to help you with?"}</p>
      </div>

      <div className="w-full absolute bottom-10 left-0">
        <VoiceModeControls />
      </div>
      <div className="absolute bottom-10 left-6">
        <ActionButton name="record.svg" onClick={onRecord} />
      </div>
      <div className="absolute bottom-10 right-6">
        <ActionButton name="send.svg" onClick={onChangeToChat} />
      </div>
    </div>
  );
}
