import { useState } from "react";
import ChatItem from "./ChatItem";

export default function ChatList({
  chats,
  onPlay,
  onReplay,
  onStopPlaying,
  onOptionClick,
  playId,
  setPlayId,
}) {
  return (
    <ul className="flex flex-col items-start gap-2 py-3">
      {chats?.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          playId={playId}
          setPlayId={setPlayId}
          onPlay={(result) => onPlay(chat, result)}
          onReplay={() => onReplay(chat)}
          onOptionClick={(option) => onOptionClick(chat, option)}
          onStopPlaying={() => {
            setPlayId("");
            onStopPlaying(chat);
          }}
        />
      ))}
    </ul>
  );
}
