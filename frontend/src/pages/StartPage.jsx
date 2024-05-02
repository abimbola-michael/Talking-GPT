import React from "react";
import LoginButton from "../components/LoginButton";
import OpenAiLogo from "../components/OpenAiLogo";
import { useNavigate } from "react-router-dom";
import { appBgColor, onTint, tint } from "../colors";

export default function StartPage() {
  const navigate = useNavigate();
  function gotoLogin() {
    navigate("/login");
  }
  function gotoSignup() {
    navigate("/signup");
  }

  return (
    <div
      className="h-full w-full md:flex gap-4 px-[15%] md:px-[5%]"
      style={{ color: tint }}
    >
      <div className="flex gap-1 absolute top-2 left-2">
        <h1 className="font-bold text-lg">Talking GPT</h1>
      </div>
      <div className="hidden w-[60%] md:flex flex-col items-start justify-center relative">
        <p className="text-lg">
          Talk to Chat GPT directly and get information easier and faster
          instead of reading
        </p>
      </div>
      <div className="w-full h-full md:w-[40%] flex flex-col items-center justify-center gap-4 relative">
        <h1 className="font-bold text-2xl">Get Started</h1>
        <div className="w-full flex gap-2 justify-stretch">
          <LoginButton title={"Login"} onClick={gotoLogin} />
          <LoginButton title={"Sign up"} onClick={gotoSignup} />
        </div>
        <div className="absolute bottom-4 left-0 w-full flex flex-col justify-start items-center gap-3">
          <div className="inline-flex items-center gap-2">
            <OpenAiLogo color={onTint} />
            <span className="font-bold text-md">OpenAI</span>
          </div>
          <div className="inline-flex items-center gap-3 text-sm text-lighter-tint">
            <span className="underline">Terms of Use</span>
            <hr className="w-[20px] rotate-90 bg-lighter-tint" />
            <span className="underline">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
