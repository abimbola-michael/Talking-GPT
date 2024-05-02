import React, { useState } from "react";
import ProfileIcon from "./ProfileIcon";
import ActionButton from "./ActionButton";
import { onTint, tint } from "../colors";
import OpenAiLogo from "./OpenAiLogo";
const recognition = new window.webkitSpeechRecognition();
recognition.lang = "en-US";

export default function VoiceModeView({
  onChangeToChat,
  onRecord,
  onReplay,
  onStopPlaying,
  onTogglePlay,
  onListen,
  onSpeakNext,
  onSpeakPrev,
  isRecording,
  isListening,
  isSpeaking,
  chat,
}) {
  // const [isRecording, setIsRecording] = useState(false);
  // const [message, setMessage] = useState("");
  // const [currentChat, setCurrentChat] = useState(null);

  // recognition.onstart = () => {
  //   setMessage("");
  // };

  // recognition.onresult = (event) => {
  //   const transcript = event.results[0][0].transcript;
  //   if (transcript.length > 0) {
  //     setMessage((message) => message + transcript);
  //   }
  // };

  // recognition.onend = () => {};

  // const startListening = () => {
  //   if (isSpeaking) {
  //     stop();
  //   }
  //   recognition.start();
  //   setIsListening(true);
  //   vibrate();
  // };

  // const stopListening = () => {
  //   recognition.stop();
  //   setIsListening(false);
  //   vibrate();
  // };

  // function vibrate() {
  //   if (navigator.vibrate) {
  //     navigator.vibrate(100);
  //   }
  // }

  // function speak(message) {
  //   if (isSpeaking()) {
  //     stop();
  //   }
  //   const utterance = new SpeechSynthesisUtterance(message);
  //   utterance.onstart = () => {};
  //   utterance.onend = () => {};
  //   // utterance.voice = window.speechSynthesis.getVoices()[0];
  //   setIspeaking(true);
  //   window.speechSynthesis.speak(utterance);
  // }
  // function pause() {
  //   setIspeaking(false);

  //   window.speechSynthesis.pause();
  // }
  // function resume() {
  //   setIspeaking(true);
  //   window.speechSynthesis.resume();
  // }
  // function stop() {
  //   setIspeaking(false);
  //   window.speechSynthesis.cancel();
  // }
  // function startRecord() {
  //   setIsRecording(true);
  // }
  // function stopRecord() {
  //   setIsRecording(false);
  // }

  // function toggleRecord() {
  //   if (isRecording) {
  //     stopRecord();
  //   } else {
  //     startRecord();
  //   }
  // }
  // function speakNext() {}
  // function speakPrev() {}
  // function toggleSpeak() {
  //   if (isSpeaking) {
  //     stop();
  //   } else {
  //     speak(message);
  //   }
  // }

  return (
    <div
      className="relative flex flex-col items-center w-full h-full"
      style={{ color: tint }}
    >
      <div className="h-[50%] w-[50%] md:w-[30%] flex flex-col items-center pt-20">
        {!chat || chat.name === "ai" ? (
          <OpenAiLogo color={onTint} radius={50} bgColor={tint} />
        ) : (
          <ProfileIcon asset={"photo.jpg"} radius={50} bgColor={"green"} />
        )}
        <h2 className="font-bold text-xl capitalize pt-2">
          {chat ? chat.name : "Ai"}
        </h2>
        <p className="text-md text-center grow">
          {chat ? chat.message : "Hi Michael\nHow may I assist you today?"}
        </p>
      </div>
      <div className="w-full flex justify-center absolute bottom-[70px] left-0">
        <ActionButton
          name={isListening ? "stop.svg" : "listen.svg"}
          onClick={onListen}
          size={70}
        />
      </div>

      <div className="w-full px-5 flex justify-between items-center gap-2 absolute bottom-3 left-0">
        <div className="shrink-0">
          <ActionButton name="previous.svg" onClick={onSpeakPrev} />
        </div>

        {isSpeaking && (
          <div className="w-full flex justify-center items-center gap-8">
            <ActionButton
              name={isSpeaking ? "pause.svg" : "play.svg"}
              onClick={onTogglePlay}
            />
            <ActionButton name={"replay.svg"} onClick={onReplay} />
            <ActionButton name={"stop.svg"} onClick={onStopPlaying} />
          </div>
        )}
        <div className="shrink-0">
          <ActionButton name="forward.svg" onClick={onSpeakNext} />
        </div>
      </div>
      {/* <div className="absolute bottom-10 left-6">
        <ActionButton name="record.svg" onClick={onRecord} />
      </div> */}
      {/* <div className="absolute bottom-10 right-6">
        <ActionButton name="send.svg" onClick={onChangeToChat} />
      </div> */}
    </div>
  );
}
