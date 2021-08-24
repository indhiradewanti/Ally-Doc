import { NavLink } from "react-router-dom";
import LoginForm from "../components/loginForm";
import bg from "../assets/bg.jpg";

export default function Login() {
  return (
    <div className="bg-no-repeat mt-10 backdrop-blur-3xl bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
    <div className="absolute bg-base-300 opacity-10 inset-0 z-0"></div>
    <div className="min-h-screen mx-0 flex flex-row justify-center">
      <div className="flex justify-center self-center z-10 mt-10">
        <div className="p-12 bg-white mx-auto rounded-2xl w-100">
          <div className="w-full pt-1 pb-5">
            <div className="new-bg text-black overflow-hidden rounded-full w-20 h-20 -mt-24 mx-auto shadow-lg flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-3xl text-center text-gray-800 vogue">Sign In</h3>
            <p className="text-gray-500 text-center text-xl caslon">Please sign in to your account.</p>
          </div>
            <LoginForm />
          <div className="pt-5 text-center text-gray-400 text-sm">
            <p>
              Don't have any accounts yet ?{" "}
              <span className="text-yellow-400 hover:text-yellow-600 ">
                <NavLink to="/sign-up">Register here !</NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
