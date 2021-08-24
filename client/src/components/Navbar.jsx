import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.PNG";

export default function Navbar() {
  const isLogin = useSelector((state) => state.users.accessToken);
  const history = useHistory()
  const logOut = () => {
    localStorage.clear()
    history.push('/sign-in')
  }

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
            {/* <NavLink to="/doctors/patient" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">
              Home
            </NavLink>
            <NavLink to="/doctors/history" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">
              History
            </NavLink>
            */}
            <NavLink to="/doctors/list" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">
              Doctors
            </NavLink> 
            <NavLink to="/sign-in" className="text-gray-700">
              <button className={ isLogin ? "hidden" : "visibile btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"}>Login</button>
            </NavLink>
            <NavLink to="/sign-up">
              <button className={ isLogin ? "hidden" : "btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"}>Sign up</button>
            </NavLink>
              <button onClick={logOut} className={ isLogin ? "btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24" : "hidden" }>Logout</button>
             <NavLink to="/user-profile" className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24">
              Profile
            </NavLink> 
          </li>

          
        </ul>
      </nav>
    </div>
  );
}
