import ActionButton from "./ActionButton";

export default function VoiceModeControls({
  setPlayingPlause,
  onRecord,
  onEnterChat,
}) {
  return (
    <div className="w-full flex justify-center items-center gap-8">
      <ActionButton name="pause.svg" onClick={onRecord} />
      <ActionButton name="previous.svg" onClick={onRecord} />
      <ActionButton name="forward.svg" onClick={onRecord} />
      <ActionButton name="listen.svg" onClick={onRecord} />
    </div>
  );
}
