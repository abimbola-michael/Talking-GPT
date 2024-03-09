import OpenAiLogo from "./OpenAiLogo";
import ListItem from "./ListItem";

export default function NewChatView() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center gap-2">
        <OpenAiLogo />
        <p className="font-bold text-2xl">How can I help you today?</p>
      </div>
      <div className="flex items-center justify-start absolute bottom-0">
        <div className="w-full grow">
          <ListItem
            title={"Help me pick"}
            subtitle={"a birthday for my mom"}
            borderColor={"black"}
            borderSize={2}
          />
        </div>
        <div className="w-full grow">
          <ListItem
            title={"Help me pick"}
            subtitle={"a birthday for my mom"}
            borderColor={"black"}
            borderSize={2}
          />
        </div>
      </div>
    </div>
  );
}
