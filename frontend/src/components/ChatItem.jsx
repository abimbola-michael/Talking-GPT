import { getChatOutputs } from "../utils/utils";
import OpenAiLogo from "./OpenAiLogo";
import ProfileIcon from "./ProfileIcon";
import CodeText from "./CodeText";
import NormalText from "./NormalText";
import { onTint, tint } from "../colors";
import AppIcon from "./AppIcon";
import PopupMenu from "./PopupMenu";
import { formatTime } from "../utils/utils";
import LoadingSignal from "./LoadingSignal";

const menuOptions = ["Regenerate", "Copy", "Share", "Delete"];
export default function ChatItem({
  chat,
  chatAction: { currentChat, action },
  setChatAction,
}) {
  const { id, name, message, time, status } = chat;
  const chatOutpts = getChatOutputs(message);
  const isAi = name === "ai";
  function onReplay() {
    setChatAction({ currentChat: chat, action: "replay" });
  }
  function onStopPlaying() {
    setChatAction({ currentChat: null, action: "" });
  }
  function onOptionClick(option) {
    setChatAction({ currentChat: chat, action: option.toLowerCase() });
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
            <OpenAiLogo color={onTint} radius={15} bgColor={tint} />
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
              currentChat?.id === id
                ? action === "play" || action === "replay"
                  ? "pause.svg"
                  : "play.svg"
                : "play.svg"
            }
            onClick={togglePlay}
          />
          {currentChat?.id === id && (
            <AppIcon name={"restart.svg"} onClick={onReplay} />
          )}
          {currentChat?.id === id && (
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
      <ul className="w-full flex flex-col items-stretch gap-2">
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
        {status === "loading" && <LoadingSignal />}
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
