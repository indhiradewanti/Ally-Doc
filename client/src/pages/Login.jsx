import { NavLink } from "react-router-dom";
import LoginForm from "../components/loginForm";

export default function Login() {
  return (
    <div className="bg-no-repeat bg-cover bg-center relative login-bg-image">
      <div className="absolute login-color opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen mx-0 flex flex-row justify-center">
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-center text-gray-800">
                Sign In{" "}
              </h3>
              <p className="text-gray-500 text-center">
                Please sign in to your account.
              </p>
            </div>
            <LoginForm/>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <p>
                Don't have any accounts yet ?{" "}
                <span className="text-yellow-400 hover:text-yellow-600 ">
                  <NavLink to="/register">Register here !</NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
