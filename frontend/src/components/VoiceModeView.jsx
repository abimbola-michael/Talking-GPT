import React, { useState } from "react";
import ProfileIcon from "./ProfileIcon";
import ActionButton from "./ActionButton";
import { tint } from "../colors";
const recognition = new window.webkitSpeechRecognition();
recognition.lang = "en-US";

export default function VoiceModeView({
  onChangeToChat,
  onRecord,
  onTogglePlay,
  onListen,
  onSpeakNext,
  onSpeakPrev,
  isRecording,
  isListening,
  isSpeaking,
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
    <div className="relative w-full h-full" style={{ color: tint }}>
      <div className="flex flex-col items-center mt-[20%]">
        <ProfileIcon
          asset={"microsoft_icon.png"}
          radius={70}
          bgColor={"green"}
        />
        <h2 className="font-bold text-lg">You</h2>
        <p className="text-md">{"What will you like me to help you with?"}</p>
      </div>

      <div className="w-full absolute bottom-3 left-0">
        <div className="w-full flex justify-center items-center gap-8">
          <ActionButton
            name={isSpeaking || isListening ? "pause.svg" : "play.svg"}
            onClick={onTogglePlay}
          />
          <ActionButton name="previous.svg" onClick={onSpeakPrev} />
          <ActionButton name="forward.svg" onClick={onSpeakNext} />
          <ActionButton name="listen.svg" onClick={onListen} />
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
