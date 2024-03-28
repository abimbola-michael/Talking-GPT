import { useEffect, useRef } from "react";
import ChatItem from "./ChatItem";

export default function ChatList({
  chats,
  chatAction,
  setChatAction,
  onEnterVoice,
}) {
  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chats]);
  return (
    <ul className="flex flex-col items-start gap-2 py-3" ref={listRef}>
      {chats?.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          chatAction={chatAction}
          setChatAction={setChatAction}
          onEnterVoice={onEnterVoice}
        />
      ))}
    </ul>
  );
}
