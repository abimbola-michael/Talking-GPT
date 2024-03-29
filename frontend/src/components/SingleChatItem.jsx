import { getChatOutputs } from "../utils/utils";
import OpenAiLogo from "./OpenAiLogo";
import ProfileIcon from "./ProfileIcon";
import CodeText from "./CodeText";
import NormalText from "./NormalText";
import { onTint, tint } from "../colors";
import AppIcon from "./AppIcon";
// import { formatTime } from "../utils/utils";
import LoadingSignal from "./LoadingSignal";
import { useState } from "react";
import PopupMenuButton from "./PopupMenuButton";
import ChatOutput from "../models/chat_output";

const menuOptions = ["Regenerate", "Edit", "Copy", "Share", "Delete"];
export default function SingleChatItem({
  name,
  chat,
  chatAction,
  setChatAction,
  onEnterVoice,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const { currentChat, action, currentIsAi } = chatAction;
  const isAi = name === "ai";
  const { id, prompt, response, time, status } = chat;
  const chatOutputs = isAi
    ? getChatOutputs(response)
    : [new ChatOutput(0, prompt, false)];

  function onReplay() {
    setChatAction({ currentChat: chat, action: "replay", isAi: isAi });
  }
  function onStopPlaying() {
    setChatAction({ currentChat: null, action: "", isAi: isAi });
  }
  function onOptionClick(option) {
    setChatAction({
      currentChat: chat,
      action: option.toLowerCase(),
      isAi: isAi,
    });
  }
  function executeOptions(option) {
    const text = !currentChat
      ? ""
      : `Prompt: ${prompt}\n\nResponse: ${response}`;
    if (option === "Edit") {
      setIsEdit(true);
    } else if (option === "Share") {
      shareText(text);
    } else if (option === "Copy") {
      copyToClipboard(text);
    } else {
      onOptionClick(option.toLowerCase());
    }
  }
  function shareText(text) {
    if (navigator.share) {
      navigator
        .share({
          title: "Share Text",
          text: text,
        })
        .then(() => {
          //console.log('Text shared successfully');
        })
        .catch((error) => {
          //console.error('Error sharing text:', error);
        });
    }
  }
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        //console.log('Text copied to clipboard');
      })
      .catch((err) => {
        //console.error('Failed to copy text: ', err);
      });
  }
  function togglePlay() {
    setChatAction({
      currentChat: chat,
      action:
        currentChat?.id === chat.id
          ? action === "play" || action === "replay"
            ? "pause"
            : "play"
          : "play",
      isAi: isAi,
    });
  }
  function enterVoiceMode() {
    onEnterVoice(index);
  }
  return (
    <li className="flex flex-col gap-2 px-4 md:px-6" style={{ color: tint }}>
      <div className="flex items-center gap-2">
        <div className="shrink-0 pt-1">
          {isAi ? (
            <OpenAiLogo color={onTint} radius={15} bgColor={tint} />
          ) : (
            <ProfileIcon url={"photo.jpg"} radius={15} />
          )}
        </div>
        <span className="grow font-bold capitalize text-md h-[22px]">
          {name}
        </span>
        <div className="inline-flex items-center gap-3">
          <AppIcon name={"voice_mode.svg"} onClick={enterVoiceMode} />

          <AppIcon
            name={
              currentChat?.id === id &&
              ((currentIsAi && isAi) || (!currentIsAi && !isAi))
                ? action === "play" || action === "replay"
                  ? "pause.svg"
                  : "play.svg"
                : "play.svg"
            }
            onClick={togglePlay}
          />
          {currentChat?.id === id &&
            ((currentIsAi && isAi) || (!currentIsAi && !isAi)) && (
              <AppIcon name={"restart.svg"} onClick={onReplay} />
            )}
          {currentChat?.id === id &&
            ((currentIsAi && isAi) || (!currentIsAi && !isAi)) && (
              <AppIcon name={"stop.svg"} onClick={onStopPlaying} />
            )}

          {!isAi && (
            <PopupMenuButton
              icon={"more.svg"}
              options={menuOptions}
              onOptionClick={executeOptions}
            />
          )}
        </div>
      </div>
      <ul className="w-full flex flex-col items-stretch gap-2">
        {chatOutputs.map((chatOut) => {
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
        {isAi && status === "loading" && <LoadingSignal />}
      </ul>
      {/* <div className="flex justify-end items-center gap-1">
        <span className="text-xs" style={{ color: tintLighter }}>
          {formatTime(time)}
        </span>
        <AppIcon
          name={"check.svg"}
          size={15}
          color={status === "success" ? "green" : "red"}
        />
      </div> */}
    </li>
  );
}
