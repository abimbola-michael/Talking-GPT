import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LoginInput from "../components/LoginInput";
import OpenAiLogo from "../components/OpenAiLogo";
import OutlinedButton from "../components/OutlinedButton";
import { onTint, tint } from "../colors";
import { getUser } from "../services/authService";
export default function LoginPage() {
  const navigate = useNavigate();
  async function login() {
    const user = await getUser();
    if (user) {
      navigate("/home");
    }
  }
  function gotoSignup() {
    navigate("/signup");
  }

  function loginWith(type) {
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
      <p className="font-bold text-3xl pt-[150px]">Welcome back</p>
      <LoginInput placeholder={"Email Address"} />
      <LoginButton title={"Continue"} onClick={login} />
      <p className="text-sm">
        {"Don't have an account?"}{" "}
        <span className="text-green-700 cursor-pointer" onClick={gotoSignup}>
          Sign up
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
          onClick={() => loginWith("google")}
        />
        <OutlinedButton
          title={"Continue with Microsoft Account"}
          icon={"microsoft_icon.png"}
          onClick={() => loginWith("microsoft")}
        />
        <OutlinedButton
          title={"Continue with Apple Account"}
          icon={"apple_icon.png"}
          onClick={() => loginWith("apple")}
        />
      </div>
    </div>
  );
}
