import { useEffect, useReducer, useRef, useState } from "react";
import Header from "../components/Header";
import SideView from "../components/SideView";
import ChatInput from "../components/ChatInput";
import ChatList from "../components/ChatList";
import NewChatView from "../components/NewChatView";
import VoiceModeView from "../components/VoiceModeView";
import { useTextToVoice, useVoiceToText } from "react-speakup";
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
  const messageRef = useRef("");
  const [playId, setPlayId] = useState("");

  //const [speakChat, setSpeakChat] = useState(null);

  const { startListening, stopListening, transcript } = useVoiceToText();
  // const { speak, resume, pause, ref, setVoice, voices, isSpeaking } =
  //   useTextToVoice();

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
    messageRef.current = message;
    const id = generateRandomString();
    const chat = new Chat(id, "me", message, Date.now(), "success");
    addChat(chat);
    generateResponseFromAi(message);
    messageRef.current = "";
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
  function executeOption(chat, option) {
    switch (option) {
      case "Regenerate":
        break;
      case "Copy":
        break;
      case "Share":
        break;
      case "Delete":
        break;
    }
  }
  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onstart = () => {};
    utterance.onend = () => {
      setPlayId("");
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
  function isPaused() {
    return window.speechSynthesis.paused;
  }

  function playChat(chat, result) {
    if (result) {
      if (isPaused()) {
        resume();
      } else {
        //setSpeakChat(chat);
        speak(chat.message);
      }
    } else {
      pause();
    }
  }
  function replayChat(chat) {
    //setSpeakChat(chat);
    speak(chat.message);
  }
  function stopPlayingChat(chat) {
    stop();
    setPlayId("");
    //setSpeakChat(null);
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
  function vibrate() {
    if (navigator.vibrate) {
      navigator.vibrate(100);
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
                  onPlay={playChat}
                  onReplay={replayChat}
                  onOptionClick={executeOption}
                  onStopPlaying={stopPlayingChat}
                  playId={playId}
                  setPlayId={setPlayId}
                />
              ) : (
                <NewChatView />
              )}
            </div>
            <ChatInput
              message={
                transcript
                  ? `${messageRef.current} ${transcript}`
                  : messageRef.current
              }
              onSend={sendMessage}
              onSpeak={() => {
                vibrate();
                startListening();
              }}
              onSpeakEnd={() => {
                vibrate();
                stopListening();
              }}
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
      {/* <div ref={ref} className="text-white w-0 h-0">
        {speakChat?.message}
      </div> */}
    </div>
  );
}
