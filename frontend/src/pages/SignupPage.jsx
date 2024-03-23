import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LoginInput from "../components/LoginInput";
import OpenAiLogo from "../components/OpenAiLogo";
import OutlinedButton from "../components/OutlinedButton";
import { onTint, tint } from "../colors";
export default function SignupPage() {
  const navigate = useNavigate();
  function signup() {
    navigate("/home");
  }
  function gotoLogin() {
    navigate("/login");
  }

  function signupWith(type) {
    if (type == "google") {
    } else if (type == "apple") {
    } else if (type == "microsoft") {
    }
  }
  return (
    <div
      className="h-full flex flex-col justify-start items-center px-[15%] md:px-[30%] gap-5 relative"
      style={{ color: tint }}
    >
      <div className="w-full absolute top-4 left-0 flex items-center justify-center">
        <OpenAiLogo color={onTint} />
      </div>
      <p className="font-bold text-3xl pt-[150px]">Create your account</p>
      <LoginInput placeholder={"Email Address"} />
      <LoginButton title={"Continue"} onClick={signup} />
      <p className="text-sm">
        {"Already have an account?"}{" "}
        <span className="text-green-700 cursor-pointer" onClick={gotoLogin}>
          Log in
        </span>
      </p>
      <div className="w-full flex items-center gap-3">
        <hr className="grow bg-lighter-tint" />
        <span className="text-sm">OR</span>
        <hr className="grow bg-lighter-tint" />
      </div>
      <div className="w-full flex flex-col gap-2 pb-[150px]">
        <OutlinedButton
          title={"Continue with Google"}
          icon={"google_icon.png"}
          onClick={() => signupWith("google")}
        />
        <OutlinedButton
          title={"Continue with Microsoft Account"}
          icon={"microsoft_icon.png"}
          onClick={() => signupWith("microsoft")}
        />
        <OutlinedButton
          title={"Continue with Apple Account"}
          icon={"apple_icon.png"}
          onClick={() => signupWith("apple")}
        />
      </div>
    </div>
  );
}
