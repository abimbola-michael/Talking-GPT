import React from "react";
import ChatItem from "./ChatItem";

export default function ChatList({ chats }) {
  return (
    <ul className="w-full h-full">
      {chats?.map((chat) => (
        <li key={chat.id}>
          <ChatItem chat={chat} />
        </li>
      ))}
    </ul>
  );
}
