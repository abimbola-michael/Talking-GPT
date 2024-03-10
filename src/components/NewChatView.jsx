import OpenAiLogo from "./OpenAiLogo";
import OutlinedButton from "./OutlinedButton";

export default function NewChatView() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center gap-2">
        <OpenAiLogo />
        <p className="font-bold text-2xl">How can I help you today?</p>
      </div>
      <div className="w-full flex items-center justify-start absolute bottom-0 gap-4 px-4 py-10">
        <div className="w-full">
          <OutlinedButton
            title={"Help me pick"}
            subtitle={"a birthday for my mom"}
          />
        </div>
        <div className="w-full">
          <OutlinedButton
            title={"Recommend a dish"}
            subtitle={"that would be best for me today and more"}
          />
        </div>
      </div>
    </div>
  );
}
