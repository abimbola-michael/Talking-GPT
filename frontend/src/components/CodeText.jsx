import { tint, tintLighter, tintLightest } from "../colors";
import AppIcon from "./AppIcon";
import SyntaxHighlighter from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/languages/prism";
import "react-syntax-highlighter/dist/cjs/styles/prism"; // Include a CSS style
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeText({ message }) {
  const lineIndex = message.indexOf("\n");
  const language = lineIndex === -1 ? message : message.substring(0, lineIndex);
  const text = lineIndex === -1 ? "" : message.substring(lineIndex + 1);
  //console.log("language", language);
  return (
    <div
      className="w-full flex flex-col items-stretch border-1 border-black-lightest dark:border-white-lightest rounded-lg"
      style={{ color: tint }}
    >
      <div
        className="w-full flex justify-between items-center p-3 bg-black-lighter dark:bg-white-lightest text-sm rounded-t-lg"
        style={{ color: tintLighter }}
      >
        <span>{language}</span>
        <div className="inline-flex gap-1 items-center">
          <AppIcon name={"copy.svg"} color={tintLighter} size={14} />
          <span>Copy code</span>
        </div>
      </div>
      {/* <p className="p-3 text-sm">{text}</p> */}
      <div className="rounded-b-lg w-full overflow-x-hidden">
        <SyntaxHighlighter language={language} style={prism}>
          {text}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
