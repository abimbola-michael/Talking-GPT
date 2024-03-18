import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import SideView from "../components/SideView";
import ChatInput from "../components/ChatInput";
import ChatList from "../components/ChatList";
import NewChatView from "../components/NewChatView";
import VoiceModeView from "../components/VoiceModeView";
import Chat from "../models/chat";
import {
  generateRandomString,
  getChatCategories,
  getChatsFromCategory,
} from "../utils/utils";
import OpenAI from "openai";

export default function HomePage() {
  const [mode, setMode] = useState("chat");
  const [isOpened, setIsOpened] = useState(false);

  const [chats, setChats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesGroups, setCategoriesGroups] = useState([]);
  const [chatAction, setChatAction] = useState({
    currentChat: null,
    action: "",
  });

  useEffect(() => {
    const chats = getChatsFromCategory(categoriesGroups, selectedCategory);
    setChats(chats);
  }, [categoriesGroups, selectedCategory]);
  useEffect(() => {
    const categories = getChatCategories(chats);
    setCategoriesGroups(categories);
  }, []);
  function toggleMode(newMode) {
    if (newMode !== mode) {
      setMode(newMode);
    }
  }
  function toggleOpened() {
    setIsOpened(!isOpened);
  }
  function addChat(chat) {
    setChats((prev) => [...prev, chat]);
  }
  function sendMessage(message) {
    const id = generateRandomString();
    const chat = new Chat(id, "me", message, Date.now(), "success");
    addChat(chat);
    generateResponseFromAi(message);
  }

  async function generateResponseFromAi(message) {
    const apiKey = import.meta.env.VITE_OPEN_API_KEY;
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
    const id = generateRandomString();

    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });
      const res = chatCompletion?.choices[0].message.content;
      console.log("response", res);
      const chat = new Chat(id, "ai", res, Date.now(), "success");
      addChat(chat);
    } catch (e) {
      const chat = new Chat(id, "ai", e.message, Date.now(), "failed");
      addChat(chat);
    }
  }

  function speak(message) {
    if (isSpeaking()) {
      stop();
    }
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onstart = () => {};
    utterance.onend = () => {
      setChatAction({ currentChat: null, action: "" });
    };
    // utterance.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(utterance);
  }
  function pause() {
    window.speechSynthesis.pause();
  }
  function resume() {
    window.speechSynthesis.resume();
  }
  function stop() {
    window.speechSynthesis.cancel();
  }
  function isSpeaking() {
    return window.speechSynthesis.speaking;
  }

  function updateAction({ currentChat, action }) {
    if (action === "play") {
      if (chatAction.currentChat !== currentChat) {
        const message =
          currentChat.name === "ai"
            ? `I replied ${currentChat.message}`
            : `You said ${currentChat.message}`;
        speak(message);
      } else {
        resume();
      }
    } else if (action === "pause") {
      pause();
    } else if (action === "replay") {
      speak(currentChat.message);
    } else if (action === "") {
      stop();
    } else if (action === "regenerate") {
    } else if (action === "copy") {
    } else if (action === "share") {
    } else if (action === "delete") {
    }
    setChatAction({ currentChat, action });
  }

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
    <div className="w-full h-full flex overflow-hidden" onClick={closeSideView}>
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
            <div className="grow overflow-y-auto">
              {chats.length > 0 ? (
                <ChatList
                  chats={chats}
                  chatAction={chatAction}
                  setChatAction={updateAction}
                />
              ) : (
                <NewChatView />
              )}
            </div>
            <ChatInput
              onSend={sendMessage}
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
