import { getChatOutputs } from "../utils/utils";
import ChatOutput from "../models/chat_output";
import SingleChatItem from "./SingleChatItem";

export default function ChatItem({
  chat,
  chatAction,
  setChatAction,
  onEnterVoice,
}) {
  const { id, prompt, response, time, status } = chat;
  const promptChatOutput = [new ChatOutput(0, prompt, false)];
  const responseChatOutpts = getChatOutputs(response);

  return (
    <div className="w-full flex flex-col items-stretch gap-2 px-4 md:px-6">
      <SingleChatItem
        name={"you"}
        status={status}
        chatOutputs={promptChatOutput}
        chatAction={chatAction}
        setChatAction={setChatAction}
        onEnterVoice={onEnterVoice}
        prompt={prompt}
        response={response}
      />
      <SingleChatItem
        name={"ai"}
        status={status}
        chatOutputs={responseChatOutpts}
        chatAction={chatAction}
        setChatAction={setChatAction}
        onEnterVoice={onEnterVoice}
        prompt={prompt}
        response={response}
      />
    </div>
  );
}
