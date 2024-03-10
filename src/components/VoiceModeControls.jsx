import ActionButton from "./ActionButton";

export default function VoiceModeControls({
  onPlayPlause,
  onRecord,
  onEnterChat,
}) {
  return (
    <div className="w-full flex justify-center items-center gap-8">
      <ActionButton name="pause.svg" onClick={onRecord} />
      <ActionButton name="previous.svg" onClick={onRecord} />
      <ActionButton name="forward.svg" onClick={onRecord} />
      <ActionButton name="listen.svg" onClick={onRecord} />

      {/* <div>
        <div className="relative">
          <ActionButton name="send.svg" onClick={onRecord} />
          <div className="absolute top-[-50px] left-0">
            <ActionButton name={"listen.svg"} onClick={onEnterChat} />
          </div>
        </div>
      </div> */}
    </div>
  );
}
