import { NavLink } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.PNG";

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 z-50 bg-gray-100">
      <nav className="flex items-center justify-between p-6 h-20 bg-white bg-opacity-50 shadow-xl">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-44" />
        </NavLink>
        <ul>
          <li className="space-x-5 text-xl">
            <NavLink to="/" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">
              Home
            </NavLink>
            <NavLink to="/doctors/patient" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">
              Home
            </NavLink>
            <NavLink to="/doctors/history" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">
              History
            </NavLink>
            <NavLink to="/doctors/list" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">
              Doctors
            </NavLink>
            <NavLink to="/sign-in" className="text-gray-700">
              <button className="btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">Login</button>
            </NavLink>
            <NavLink to="/sign-up">
              <button className="btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">Sign up</button>
            </NavLink>
          </li>
          <div className="sm:hidden space-y-1 hover:cursor-pointer">
            <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
            <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
            <span className="w-10 h-1 bg-gray-600 rounded-full block"></span>
          </div>
        </ul>
      </nav>
    </div>
  );
}
