import AppIcon from "./AppIcon";

export default function ActionButton({ name, onClick }) {
  return (
    <div
      className="p-3 rounded-lg items-center justify-center"
      onClick={onClick}
      // style={{
      //   backgroundColor: "black",
      // }}
    >
      <AppIcon name={name} color={"white"} />
    </div>
  );
}
