import { getChatOutputs } from "../utils/utils";
import OpenAiLogo from "./OpenAiLogo";
import ProfileIcon from "./ProfileIcon";
import CodeText from "./CodeText";

export default function ChatItem({ chat: { message, id, name } }) {
  const chatOutpts = getChatOutputs(message);
  const isAi = id === "ai";
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        {isAi ? <OpenAiLogo /> : <ProfileIcon />}
        {chatOutpts.map((chatOut) => {
          return (
            <li key={chatOut.id}>
              {chatOut.isCode ? (
                <p className="text-md">{chatOut.text}</p>
              ) : (
                <CodeText />
              )}
            </li>
          );
        })}
      </div>
    </div>
  );
}
