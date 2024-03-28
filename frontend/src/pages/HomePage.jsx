import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import SideView from "../components/SideView";
import ChatInput from "../components/ChatInput";
import ChatList from "../components/ChatList";
import NewChatView from "../components/NewChatView";
import VoiceModeView from "../components/VoiceModeView";
import VoiceSelectView from "../components/VoiceSelectView";
import Chat from "../models/chat";
import {
  generateRandomString,
  getPrompt,
  // getReadableMessage,
  getReadableMessages,
} from "../utils/utils";
import OpenAI from "openai";
import CategoryGroup from "../models/category_group";
import Category from "../models/category";
import ActionButton from "../components/ActionButton";
import { createCategory, updateCategory } from "../services/categoryService";
const recognition = new window.webkitSpeechRecognition();
recognition.lang = "en-US";

export default function HomePage() {
  const [speakIndex, setSpeakIndex] = useState(-1);
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
      [new Category("general", "General", Date.now().toString())],
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
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);
  const [showVoiceSelect, setShowVoiceSelect] = useState(false);

  const messageRef = useRef("");

  const speakMessagesRef = useRef([]);
  const speakMessageIndexRef = useRef(-1);
  let testMessage = "Hi Michael, How may i assist you today?";

  useEffect(() => {
    setVoices(window.speechSynthesis.getVoices());
    setVoice(window.speechSynthesis.getVoices()[0]);
  }, []);
  useEffect(() => {
    
  }, []);
  //Listening
  useEffect(() => {
    recognition.onstart = () => {
      if (!isListening) {
        setIsListening(true);
      }
      if (isSpeaking) {
        stopSpeaking();
      }
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.length > 0) {
        const fullMessage = messageRef.current + " " + transcript;
        //console.log("message", transcript);
        setTranscriptMessage(fullMessage);
        messageRef.current = fullMessage;
      }
    };
    recognition.onend = () => {
      if (isListening) {
        setIsListening(false);
      }
      // if (mode === "voice" && transcriptMessage.length > 0) {
      //   sendMessage(transcriptMessage);
      // }
    };
  }, [isListening, isSpeaking, transcriptMessage, mode]);

  function startListening() {
    if (isSpeaking) {
      stopSpeaking();
    }
    recognition.start();
    setIsListening(true);
    vibrate();
  }

  function stopListening() {
    recognition.stop();
    setIsListening(false);
    vibrate();
  }

  //Speaking
  function speakVoiceTestMessage(voice) {
    speakSynthesisMessage(testMessage, voice);
  }
  function speak(message) {
    const readableMessages = getReadableMessages(message);
    speakMessagesRef.current = readableMessages;
    speakMessageIndexRef.current = 0;
    speakSynthesisMessage(readableMessages[speakMessageIndexRef.current]);

    //console.log("readableMessages", readableMessages);
    // for (let i = 0; i < readableMessages.length; i++) {
    //   const speakMessage = readableMessages[i];
    //   speakSynthesisMessage(speakMessage);
    // }
  }
  function speakSynthesisMessage(message, speakVoice) {
    if (message.trim().length === 0) return;
    if (isListening) {
      stopListening();
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onstart = () => {
      if (!isSpeaking) {
        setIsSpeaking(true);
      }
      if (isListening) {
        stopListening();
      }
    };
    utterance.onend = () => {
      if (
        speakMessageIndexRef.current ===
        speakMessagesRef.current.length - 1
      ) {
        setChatAction({ currentChat: null, action: "" });
      }
      if (speakMessageIndexRef.current < speakMessagesRef.current.length) {
        speakMessageIndexRef.current++;
        speakSynthesisMessage(
          speakMessagesRef.current[speakMessageIndexRef.current]
        );
      }

      if (mode === "voice") {
        if (isSpeaking) {
          setIsSpeaking(false);
        }
        if (
          speakMessageIndexRef.current ===
          speakMessagesRef.current.length - 1
        ) {
          if (speakIndex === chats.length - 1) {
            startListening();
          } else {
            speakNext();
          }
        }
      }
    };
    const utteranceVoice = speakVoice ?? voice;
    if (utteranceVoice) {
      utterance.voice = utteranceVoice;
    }
    window.speechSynthesis.speak(utterance);
  }
  function pauseSpeaking() {
    window.speechSynthesis.pause();
    setIsSpeaking(false);
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
    messageRef.current = "";
    setTranscriptMessage("");
    if (mode === "chat") {
      stopSpeaking();
      stopListening();
      setSpeakIndex(chats.length);
      if (chats.length === 0) {
        speak("Hi Michael, How may I assist you today?");
      } else {
        startListening();
      }
      setMode("voice");
    } else {
      setSpeakIndex(-1);
      setMode("chat");
    }
  }
  function enterVoiceMode(index) {
    stopSpeaking();
    stopListening();
    setSpeakIndex(index);
    speak(chats[index].message);
    setMode("voice");
  }
  function toggleOpened() {
    setIsOpened((isOpened) => !isOpened);
  }
  function addChat(chat, aiChat) {
    setChats((prevChats) => {
      const newChats = [...prevChats, chat, aiChat];
      generateResponseFromAi(getPrompt(newChats), aiChat.id);
      return newChats;
    });
  }
  function updateMessage(message) {
    messageRef.current = message;
  }
  function sendMessage(message) {
    if (message.trim().length === 0) return;
    message = message.trim();
    messageRef.current = "";
    if (transcriptMessage.length > 0) {
      setTranscriptMessage("");
    }
    const id = generateRandomString();
    const aiId = generateRandomString();
    const chat = new Chat(id, "you", message, Date.now(), "success");
    const aiChat = new Chat(aiId, "ai", "", Date.now(), "loading");
    addChat(chat, aiChat);
  }
  function sendChatToDatabase() {}

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
      //  console.log("response", res);

      // let minSpeakLength = 10;

      for await (const chunk of stream) {
        const res = chunk.choices[0]?.delta?.content || "";

        setChats((chats) =>
          chats.map((chat) =>
            chat.id === id
              ? new Chat(
                  chat.id,
                  chat.name,
                  chat.message + res,
                  Date.now(),
                  "loading"
                )
              : chat
          )
        );
        getReadableMessages(res, speakMessagesRef.current);

        if (mode === "voice") {
          if (speakMessagesRef.current.length === 2) {
            speak(speakMessagesRef.current[0]);
          }
        }
      }

      setChats((chats) =>
        chats.map((chat) =>
          chat.id === id
            ? new Chat(chat.id, chat.name, chat.message, Date.now(), "success")
            : chat
        )
      );
      if (mode === "voice") {
        if (speakMessagesRef.current.length === 1) {
          speak(speakMessagesRef.current[0]);
        }
      }
    } catch (e) {
      setChats((chats) =>
        chats.map((chat) =>
          chat.id === id
            ? new Chat(chat.id, chat.name, e.message, Date.now(), "failed")
            : chat
        )
      );
      if (mode === "voice") {
        speak(e.message);
      }
    }
  }

  function updateAction({ currentChat, action }) {
    //console.log("action", action, currentChat);
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
      stopSpeaking();
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
  async function saveCategory(categoryGroup, newCategoryName) {
    let id;
    if (editCategory === "") {
      const category = await createCategory(newCategoryName);
      id = category.id;
    } else {
      id = editCategory;
      await updateCategory(id);
    }

    setCategoriesGroups((catGroups) =>
      catGroups.map((catGroup) =>
        catGroup.title === categoryGroup.title
          ? new CategoryGroup(
              catGroup.title,
              catGroup.categories.map((cat) =>
                cat.id === editCategory
                  ? new Category(id, newCategoryName, Date.now().toString())
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
    //const id = (Math.random() * 10000).toString();
    const id = "";
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
    setSelectedCategory(category.id);
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
  function speakNext() {
    if (isSpeaking) {
      stopSpeaking();
    }
    if (speakIndex >= chats.length) {
      return;
    }
    setSpeakIndex((index) => index + 1);
    speak(chats[speakIndex].message);
  }
  function speakPrev() {
    if (isSpeaking) {
      stopSpeaking();
    }
    if (speakIndex < 0) {
      return;
    }
    setSpeakIndex((index) => index - 1);
    speak(chats[speakIndex].message);
  }
  function togglePlay() {
    if (isSpeaking) {
      pauseSpeaking();
    } else {
      resumeSpeaking();
    }
  }
  function replay() {
    stopSpeaking();
    if (speakIndex < 0 || speakIndex >= chats.length) return;
    speak(chats[speakIndex].message);
  }
  function toggleSearch() {
    if (searching) {
      setSearching(false);
      setSearchedchats([]);
    } else {
      setSearching(true);
    }
  }
  // function closeSearch() {
  //   setSearching(false);
  //   setSearchedchats([]);
  // }
  function executeClickOutside() {
    stopEditingCategory();
    // closeSearch();
  }
  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      onClick={executeClickOutside}
    >
      <div
        className={`h-full w-[50%] md:w-[30%] absolute top-0 left-0 z-10 md:relative md:z-0 ${
          isOpened ? "block" : "hidden"
        }`}
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
      <div
        className="relative w-full h-full md:w-[70%] flex flex-col"
        onClick={closeSideView}
      >
        <Header
          opened={isOpened}
          searching={searching}
          setSearching={setSearching}
          toggleSearch={toggleSearch}
          mode={mode}
          categoryName={selectedCategory}
          setOpened={toggleOpened}
          onRightClick={createNewCategory}
          onSearch={searchChats}
          selectVoice={setShowVoiceSelect}
          // onSearchTop={(value) => searchChats(value, "top")}
          // onSearchBottom={(value) => searchChats(value, "bottom")}
        />
        {mode == "voice" ? (
          <VoiceModeView
            onListen={toggleListen}
            onSpeakNext={speakNext}
            onSpeakPrev={speakPrev}
            onTogglePlay={togglePlay}
            onRecord={toggleRecord}
            onReplay={replay}
            onStopPlaying={stopSpeaking}
            isSpeaking={isSpeaking}
            isListening={isListening}
            isRecording={false}
            chat={
              speakIndex < 0 || speakIndex >= chats.length
                ? null
                : chats[speakIndex]
            }
          />
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="grow overflow-y-auto">
              {chats.length > 0 ? (
                <ChatList
                  chats={searchedchats.length > 0 ? searchedchats : chats}
                  chatAction={chatAction}
                  setChatAction={updateAction}
                  onEnterVoice={enterVoiceMode}
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
          </div>
        )}
        <div className="absolute bottom-[70px] right-5 z-3">
          <ActionButton
            name={mode === "voice" ? "plane.svg" : "voice_mode.svg"}
            onClick={toggleMode}
          />
        </div>
        {isOpened && (
          <div
            className="absolute top-0 left-0 md:hidden w-full h-full z-5"
            style={{ backgroundColor: "rgb(0, 0, 0, 0.5)" }}
          ></div>
        )}
        {showVoiceSelect && (
          <div className="w-full h-full absolute top-0 left-0">
            <VoiceSelectView
              voices={voices}
              currentVoice={voice}
              setCurrentVoice={setVoice}
              setShowVoiceSelect={setShowVoiceSelect}
              speakMessage={speakVoiceTestMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
