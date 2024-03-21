import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LoginInput from "../components/LoginInput";
import OpenAiLogo from "../components/OpenAiLogo";
export default function OnboardingPage() {
    const navigate = useNavigate();

    function Onboarding() {
        navigate("/home");
    }

    return (
        <div className="h-full flex flex-col justify-start items-center px-[15%] md:px-[30%] gap-5 relative">
          <div className="w-full absolute top-4 left-0 flex items-center justify-center">
        <OpenAiLogo />
      </div>
      <h2 className="font-bold text-3xl pt-[150px]">Tell us about you</h2>
          <LoginInput placeholder="Full Name" />
          <LoginInput placeholder="Birthday" />
          <p className="text-white text-center">
            By clicking "Agree", you agree to our{' '} 
          <a href="/Terms" className="text-green-500 underline">Terms</a>{' '}
            and have read our {' '}
            <a href="/privacy policy" className="text-green-500 underline">
                Privacy Policy
            </a>
          </p>
          <LoginButton title="Agree" onClick={Onboarding} />
        </div>
      );
}