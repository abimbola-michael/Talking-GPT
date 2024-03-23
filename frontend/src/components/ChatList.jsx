import ChatItem from "./ChatItem";

export default function ChatList({ chats, chatAction, setChatAction }) {
  return (
    <ul className="flex flex-col items-start gap-2 py-3">
      {chats?.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          chatAction={chatAction}
          setChatAction={setChatAction}
        />
      ))}
    </ul>
  );
}
