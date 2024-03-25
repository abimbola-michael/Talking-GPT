import { useRef, useState } from "react";
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
import CategoryGroup from "../models/category_group";
import Category from "../models/category";
import ActionButton from "../components/ActionButton";

export default function HomePage() {
  const [searching, setSearching] = useState(false);
  const [mode, setMode] = useState("chat");
  const [isOpened, setIsOpened] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchedchats, setSearchedchats] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [editCategory, setEditCategory] = useState(null);

  const [categoriesGroups, setCategoriesGroups] = useState([
    new CategoryGroup(
      "Today",
      [new Category("", "General", Date.now().toString())],
      Date.now().toString()
    ),
  ]);
  const [chatAction, setChatAction] = useState({
    currentChat: null,
    action: "",
  });
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcriptMessage, setTranscriptMessage] = useState("");
  const messageRef = useRef("");

  // useEffect(() => {
  //   const chats = getChatsFromCategory(categoriesGroups, selectedCategory);
  //   setChats(chats);
  // }, [categoriesGroups, selectedCategory]);
  // useEffect(() => {
  //   const categories = getChatCategories(chats);
  //   setCategoriesGroups(categories);
  // }, []);

  //Listening
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-US";

  recognition.onstart = () => {};

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (transcript.length > 0) {
      messageRef.current = messageRef.current + " " + transcript;
      setTranscriptMessage(messageRef.current);
      //setValue((value) => `${value} ${transcript}`);
    }
    if (isListening) {
      setIsListening(false);
    }
  };

  recognition.onend = () => {
    if (isListening) {
      setIsListening(false);
    }
  };

  const startListening = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    recognition.start();
    setIsListening(true);
    vibrate();
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
    vibrate();
  };

  //Speaking
  function speak(message) {
    if (isListening) {
      stopListening();
    }
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onstart = () => {};
    utterance.onend = () => {
      if (isSpeaking) {
        setIsSpeaking(false);
      }
    };
    // utterance.voice = window.speechSynthesis.getVoices()[0];
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }
  function pauseSpeaking() {
    setIsSpeaking(false);
    window.speechSynthesis.pause();
  }
  function resumeSpeaking() {
    window.speechSynthesis.resume();
    setIsSpeaking(true);
  }
  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  //Vibrate
  function vibrate() {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }

  // function toggleMode(newMode) {
  //   if (newMode !== mode) {
  //     setMode(newMode);
  //   }
  // }

  function toggleMode() {
    if (mode === "chat") {
      setMode("voice");
    } else {
      setMode("chat");
    }
  }
  function toggleOpened() {
    setIsOpened(!isOpened);
  }
  function addChat(chat) {
    setChats((prev) => [...prev, chat]);
  }
  function updateMessage(message) {
    messageRef.current = message;
  }
  function sendMessage(message) {
    messageRef.current = "";
    if (transcriptMessage.length > 0) {
      setTranscriptMessage("");
    }
    const id = generateRandomString();
    const chat = new Chat(id, "me", message, Date.now(), "success");
    addChat(chat);
    const aiId = generateRandomString();
    const aichat = new Chat(aiId, "ai", "", Date.now(), "loading");
    addChat(aichat);
    generateResponseFromAi(message, aiId);
  }

  async function generateResponseFromAi(message, id) {
    const apiKey = import.meta.env.VITE_OPEN_API_KEY;
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
    try {
      const stream = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
        stream: true,
      });
      //const res = chatCompletion?.choices[0].message.content;
      //console.log("response", res);
      for await (const chunk of stream) {
        const res = chunk.choices[0]?.delta?.content || "";
        setChats((chats) =>
          chats.map((chat) =>
            chat.id === id ? { ...chat, message: chat.message + res } : chat
          )
        );
      }
      setChats((chats) =>
        chats.map((chat) =>
          chat.id === id ? { ...chat, status: "success" } : chat
        )
      );
    } catch (e) {
      setChats((chats) =>
        chats.map((chat) =>
          chat.id === id
            ? { ...chat, message: e.message, status: "failed" }
            : chat
        )
      );
    }
  }

  function updateAction({ currentChat, action }) {
    console.log("action", action, currentChat);
    if (action === "play") {
      if (chatAction.currentChat !== currentChat) {
        const message =
          currentChat.name === "ai"
            ? `I replied ${currentChat.message}`
            : `You said ${currentChat.message}`;
        speak(message);
      } else {
        resumeSpeaking();
      }
    } else if (action === "pause") {
      pauseSpeaking();
    } else if (action === "replay") {
      speak(currentChat.message);
    } else if (action === "") {
      stopSpeaking();
    } else if (action === "regenerate") {
    } else if (action === "edit") {
    } else if (action === "copy") {
    } else if (action === "share") {
    } else if (action === "delete") {
    }
    setChatAction({ currentChat, action });
  }
  function stopEditingCategory() {
    if (editCategory !== null) {
      deleteCategory("Today", "");
      setEditCategory(null);
    }
  }
  function saveCategory(categoryGroup, newCategoryName) {
    setCategoriesGroups((catGroups) =>
      catGroups.map((catGroup) =>
        catGroup.title === categoryGroup.title
          ? new CategoryGroup(
              catGroup.title,
              catGroup.categories.map((cat) =>
                cat.name === editCategory
                  ? new Category(cat.id, newCategoryName, Date.now().toString())
                  : cat
              ),
              catGroup.time
            )
          : catGroup
      )
    );
    stopEditingCategory();
  }
  function deleteCategory(categoryGroupTitle, categoryName) {
    setCategoriesGroups((catGroups) =>
      catGroups.map((catGroup) =>
        catGroup.title === categoryGroupTitle
          ? new CategoryGroup(
              catGroup.title,
              catGroup.categories.filter((cat) => cat.name !== categoryName),
              catGroup.time
            )
          : catGroup
      )
    );
  }
  function executeOptions(categoryGroup, categoryName, option) {
    if (option === "Edit") {
      setEditCategory(categoryName);
    } else if (option === "Delete") {
      deleteCategory(categoryGroup.title, categoryName);
    }
  }

  function createNewCategory() {
    if (editCategory === "") {
      return;
    }
    const id = (Math.random() * 10000).toString();
    setCategoriesGroups((catGroups) =>
      catGroups.map((catGroup, index) =>
        index === 0
          ? new CategoryGroup(
              catGroup.title,
              [
                new Category(id, "", Date.now().toString()),
                ...catGroup.categories,
              ],
              catGroup.time
            )
          : catGroup
      )
    );

    setEditCategory("");
    //setChats([]);
  }
  function loadChats(category) {
    setSelectedCategory(category.name);
    setChats([]);
    closeSideView();
  }
  function searchChats(value) {
    setSearchedchats((chats) =>
      chats.filter((chat) => chat.message.includes(value))
    );
  }
  function closeSideView() {
    if (isOpened) {
      setIsOpened(false);
    }
  }
  function toggleRecord() {}
  function toggleListen() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }
  function speakNext() {}
  function speakPrev() {}
  function togglePlay() {
    if (isSpeaking) {
      pauseSpeaking();
    } else {
      resumeSpeaking();
    }
  }
  function toggleSearch() {
    if (searching) {
      setSearching(false);
      setSearchedchats([]);
    } else {
      setSearching(true);
    }
  }
  function closeSearch() {
    setSearching(false);
    setSearchedchats([]);
  }
  function executeClickOutside() {
    stopEditingCategory();
    // closeSearch();
  }
  return (
    <div
      className="w-full h-full flex overflow-hidden"
      onClick={executeClickOutside}
    >
      <div
        className={`h-full ${
          isOpened ? "block absolute top-0 left-0 z-10" : "hidden"
        } md:block w-[50%] md:w-[30%] md:relative`}
        // className={`h-full ${
        //   isOpened ? "block absolute top-0 left-0 z-10" : "hidden"
        // } md:block w-[50%] md:w-[30%] md:relative`}
      >
        <SideView
          editCategory={editCategory}
          selectedCategory={selectedCategory}
          categoriesGroups={categoriesGroups}
          onClose={closeSideView}
          onCreateNew={createNewCategory}
          onCategoryClick={loadChats}
          onSaveCategory={saveCategory}
          onOptionClick={executeOptions}
        />
      </div>
      <div className="w-full md:w-[70%] flex flex-col" onClick={closeSideView}>
        <Header
          opened={isOpened}
          searching={searching}
          setSearching={setSearching}
          toggleSearch={toggleSearch}
          mode={mode}
          categoryName={selectedCategory}
          onLeftClick={toggleOpened}
          onRightClick={createNewCategory}
          onSearch={searchChats}
          // onSearchTop={(value) => searchChats(value, "top")}
          // onSearchBottom={(value) => searchChats(value, "bottom")}
        />
        {mode == "voice" ? (
          <VoiceModeView
            // onChangeToChat={() => toggleMode("chat")}
            onListen={toggleListen}
            onSpeakNext={speakNext}
            onSpeakPrev={speakPrev}
            onTogglePlay={togglePlay}
            onRecord={toggleRecord}
            isSpeaking={isSpeaking}
            isListening={isListening}
            isRecording={false}
          />
        ) : (
          <>
            <div className="grow overflow-y-auto">
              {chats.length > 0 ? (
                <ChatList
                  chats={searchedchats.length > 0 ? searchedchats : chats}
                  chatAction={chatAction}
                  setChatAction={updateAction}
                />
              ) : (
                <NewChatView />
              )}
            </div>
            <ChatInput
              initialValue={transcriptMessage}
              onChange={updateMessage}
              onSend={sendMessage}
              onListen={toggleListen}
              isListening={isListening}
              // onEnterVoice={() => toggleMode("voice")}
              // onLongClick={startListening}
              // onLongClickEnd={stopListening}
            />
          </>
        )}
        <div className="absolute bottom-[70px] right-5 z-20">
          <ActionButton
            name={mode === "voice" ? "send.svg" : "voice_mode.svg"}
            onClick={toggleMode}
          />
        </div>
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
