import AppIcon from "./AppIcon";

export default function CodeText({ message }) {
  const lineIndex = message.indexOf("\n");
  const language = lineIndex === -1 ? message : message.substring(0, lineIndex);
  const text = lineIndex === -1 ? "" : message.substring(lineIndex + 1);
  return (
    <div className="flex flex-col border-1 rounded-md border-lightest-tint">
      <div className="flex justify-between items-center px-3 py-1 bg-lightest-tint text-sm">
        <span>{language}</span>
        <div className="inline-flex gap-1">
          <AppIcon name={"copy.svg"} />
          <span>Copy code</span>
        </div>
      </div>
      <p className="p-3 text-sm">{text}</p>
    </div>
  );
}
