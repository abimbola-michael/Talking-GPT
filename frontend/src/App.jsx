import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StartPage from "./pages/StartPage";
import HomePage from "./pages/HomePage";
import OnboardingPage from "./pages/OnboardingPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
