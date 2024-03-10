import { useReducer, useRef, useState } from "react";
import Header from "../components/Header";
import SideView from "../components/SideView";
import ChatInput from "../components/ChatInput";
import ChatList from "../components/ChatList";
import NewChatView from "../components/NewChatView";
import VoiceModeView from "../components/VoiceModeView";

// function chatReducer(state, action) {
//   switch (action.type) {
//     case ""
//   }
// }
export default function HomePage() {
  const [mode, setMode] = useState("chat");
  const [isOpened, setIsOpened] = useState(false);
  // const [{ chats, selectedCategory }, dispatch] = useReducer(chatReducer, {
  //   chats: [],
  //   selectedCategory: "",
  // });
  const [chats, setChats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesGroups, setCategoriesGroups] = useState([]);
  function toggleMode(newMode) {
    if (newMode !== mode) {
      setMode(newMode);
    }
  }
  function toggleOpened() {
    setIsOpened(!isOpened);
  }
  function sendChat(message) {}
  function createNewChat() {
    setSelectedCategory("");
    setChats([]);
  }
  function loadChats(category) {
    setSelectedCategory(category);
    setChats([]);
  }
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
        } md:block w-[50%] md:w-[30%] md:relative`}
      >
        <SideView
          selectedCategory={selectedCategory}
          categories={categoriesGroups}
          onClose={closeSideView}
          onCreateNew={createNewChat}
          onCategoryClick={loadChats}
        />
      </div>
      <div className="w-full md:w-[70%] flex flex-col">
        <Header onLeftClick={toggleOpened} onRightClick={createNewChat} />
        {mode == "voice" ? (
          <VoiceModeView onChangeToChat={() => toggleMode("chat")} />
        ) : (
          <>
            <div className="grow">
              {chats.length > 0 ? <ChatList chats={chats} /> : <NewChatView />}
            </div>
            <ChatInput
              onSend={sendChat}
              onEnterVoice={() => toggleMode("voice")}
            />
          </>
        )}
        {isOpened && (
          <div
            className="absolute top-0 left-0 md:hidden w-full h-full z-5"
            style={{ backgroundColor: "rgb(0, 0, 0, 0.5)" }}
          ></div>
        )}
      </div>
    </div>
  );
}
