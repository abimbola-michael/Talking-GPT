import { getChatOutputs } from "../utils/utils";
import OpenAiLogo from "./OpenAiLogo";
import ProfileIcon from "./ProfileIcon";
import CodeText from "./CodeText";
import NormalText from "./NormalText";
import { appBgColor, tint, tintLighter } from "../colors";
import AppIcon from "./AppIcon";
import { useState } from "react";
import PopupMenu from "./PopupMenu";
import { formatTime } from "../utils/utils";
import { useTextToVoice } from "react-speakup";

const menuOptions = ["Regenerate", "Copy", "Share", "Delete"];
export default function ChatItem({
  chat: { id, name, message, time, status },
  playId,
  setPlayId,
  onPlay,
  onReplay,
  onStopPlaying,
  onOptionClick,
}) {
  const { speak, resume, pause, ref, setVoice, voices, isSpeaking } =
    useTextToVoice();

  const [playing, setPlaying] = useState(false);
  // const [showMore, setShowMore] = useState(false);

  const chatOutpts = getChatOutputs(message);
  const isAi = name === "ai";
  function togglePlay() {
    // if (playId !== id) {
    //   setPlayId(id);
    //   setVoice(voices[0]);
    //   speak(message);
    // } else {
    //   if (isSpeaking) {
    //     pause();
    //   } else {
    //     resume();
    //   }
    // }

    setPlaying((playing) => {
      if (!playing && playId !== id) {
        setPlayId(id);
      }
      onPlay(!playing);
      return !playing;
    });
  }
  return (
    <li
      className="w-full flex flex-col items-stretch gap-2 px-4 md:px-6"
      style={{ color: tint }}
    >
      <div className="flex items-center gap-2">
        <div className="shrink-0 pt-1">
          {isAi ? (
            <OpenAiLogo color={appBgColor} radius={15} bgColor={tint} />
          ) : (
            <ProfileIcon url={"photo.jpg"} radius={15} />
          )}
        </div>
        <span className="grow font-bold capitalize text-md h-[22px]">
          {name}
        </span>
        <div className="inline-flex items-center gap-3">
          <AppIcon
            name={
              playId === id ? (playing ? "pause.svg" : "play.svg") : "play.svg"
            }
            onClick={togglePlay}
          />
          {playId === id && <AppIcon name={"restart.svg"} onClick={onReplay} />}
          {playId === id && (
            <AppIcon name={"stop.svg"} onClick={onStopPlaying} />
          )}

          <div className="relative group">
            <AppIcon name={"more.svg"} />
            <div className="hidden group-hover:block">
              <PopupMenu options={menuOptions} onOptionClick={onOptionClick} />
            </div>
          </div>
        </div>
      </div>
      <ul ref={ref} className="w-full flex flex-col items-stretch gap-2">
        {chatOutpts.map((chatOut) => {
          return (
            <li key={chatOut.id}>
              {chatOut.isCode ? (
                <CodeText message={chatOut.text} />
              ) : (
                <NormalText message={chatOut.text} />
              )}
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end items-center gap-1">
        <span className="text-xs" style={{ color: tintLighter }}>
          {formatTime(time)}
        </span>
        <AppIcon
          name={"check.svg"}
          size={15}
          color={status === "success" ? "green" : "red"}
        />
      </div>
    </li>
  );
}
