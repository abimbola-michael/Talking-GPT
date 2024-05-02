import { getChatOutputs } from "../utils/utils";
import ChatOutput from "../models/chat_output";
import SingleChatItem from "./SingleChatItem";

export default function ChatItem({
  chat,
  chatAction,
  setChatAction,
  onEnterVoice,
}) {
  return (
    <div className="w-full flex flex-col gap-2 px-4 md:px-6">
      <SingleChatItem
        name={"you"}
        chat={chat}
        chatAction={chatAction}
        setChatAction={setChatAction}
        onEnterVoice={onEnterVoice}
      />
      <SingleChatItem
        name={"ai"}
        chat={chat}
        chatAction={chatAction}
        setChatAction={setChatAction}
        onEnterVoice={onEnterVoice}
      />
    </div>
  );
}
