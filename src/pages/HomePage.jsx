import { useState } from "react";
import Header from "../components/Header";
import SideView from "../components/SideView";
import ChatInput from "../components/ChatInput";
import ChatList from "../components/ChatList";
import NewChatView from "../components/NewChatView";

export default function HomePage() {
  const [isOpened, setIsOpened] = useState(false);
  const [chats, setChats] = useState([]);
  const [categories, setCategories] = useState([
    "Category 1.1",
    "Category 1.2",
    "Category 1.3",
  ]);
  function toggleOpened() {
    setIsOpened(!isOpened);
  }
  function sendChat(message) {}
  function createNewChat() {
    setChats([]);
  }
  function loadChats(category) {}
  function closeSideView() {
    if (isOpened) {
      setIsOpened(false);
    }
  }
  return (
    <div className="w-full h-full flex" onClick={closeSideView}>
      <div
        className={`h-full ${
          isOpened ? "block absolute top-0 left-0 z-10" : "hidden"
        } md:block w-[50%] md:w-[30%]`}
      >
        <SideView
          categories={categories}
          onClose={closeSideView}
          onCreateNew={createNewChat}
          onCategoryClick={loadChats}
        />
      </div>
      <div className="w-full md:w-[70%] flex flex-col">
        <Header onLeftClick={toggleOpened} onRightClick={createNewChat} />
        <div className="grow">
          {chats.length > 0 ? <ChatList chats={chats} /> : <NewChatView />}
        </div>
        <ChatInput onSend={sendChat} />
      </div>
    </div>
  );
}
