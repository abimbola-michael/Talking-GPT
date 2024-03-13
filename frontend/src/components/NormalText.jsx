import { tint } from "../colors";

export default function NormalText({ message }) {
  return (
    <div className="text-md" style={{ color: tint }}>
      {message}
    </div>
  );
}
