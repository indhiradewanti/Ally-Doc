import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginDoctor, loginUser } from "../stores/actions/actionDoctorUser";

export default function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.doctorUser.isLogin)
  const [state, setState] = useState('user')
  const [loggedCurrentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if(state === 'user'){
      dispatch(loginUser(loggedCurrentUser));
    }else{
      dispatch(loginDoctor(loggedCurrentUser))
    }
    console.log(isLogin, 'ini di handle')
  };

  const handleChange = () => {
    if(state === 'user'){
      setState('doctor')
    } else{
      setState('user')
    }
  }
  console.log(isLogin, 'ini di luar')
  useEffect(() => {
    if (isLogin || localStorage.getItem('access_token')) {
      if(isLogin === 'user'){
        Swal.fire({
          icon: "success",
          title: "Login success"
        });
        history.push("/");
      } else{
        Swal.fire({
          icon: "success",
          title: "Login success"
        });
        history.push("/doctors/patient");
      }
    }
  }, [isLogin])


  return (
  <div>
    <div>
      <span>{state}</span>
      <input type="checkbox" className="toggle"
      // onChange={handleChange}
      onClick={handleChange}
      />
      </div>
    <form onSubmit={handleLogin} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 tracking-wide">
          Email
        </label>
        <input
          onChange={(e) =>
            setCurrentUser({ ...loggedCurrentUser, email: e.target.value })
          }
          className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type=""
          placeholder="mail@gmail.com"
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Password
        </label>
        <input
          onChange={(e) =>
            setCurrentUser({ ...loggedCurrentUser, password: e.target.value })
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type=""
          placeholder="Enter your password"
        />
      </div>
      <div className="flex items-center justify-between"></div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
        >
          Sign in
        </button>
      </div>
    </form>
    </div>
  );
}
