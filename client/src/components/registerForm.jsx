import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { regisUser } from "../stores/actions/actionDoctorUser";
import FileUploaded from './FileUploader'

export default function RegisterForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.users.accessToken);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")
  const [height,setHeight] = useState(0)
  const [weight,setWeight] = useState(0)
  const [age, setAge] = useState(0)
  const [phone_number, setPhone_number] = useState('')
  const [gender,setGender] = useState('')
  const [display_picture, setDisplay_picture] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email",email)
    formData.append("password",password)
    formData.append("username",username)
    formData.append("height",height)
    formData.append("weight", weight)
    formData.append("age",age)
    formData.append("phone_number",phone_number)
    formData.append("gender",gender)
    formData.append("display_picture",display_picture)
    dispatch(regisUser(formData));
  };

  if (isLogin) {
    Swal.fire({
      icon: "success",
      title: "Register success"
    });
    history.push("/");
  }

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 tracking-wide">
          Email
        </label>
        <input
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="email"
          placeholder="mail@gmail.com"
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Password
        </label>
        <input
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Username
        </label>
        <input
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="text"
          placeholder="Enter your username"
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Height
        </label>
        <input
          onChange={(e) =>
            setHeight(Number(e.target.value))
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="number"
          placeholder="Enter your height"
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Weight
        </label>
        <input
          onChange={(e) =>
            setWeight(Number(e.target.value))
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="number"
          placeholder="Enter your weight"
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          age
        </label>
        <input
          onChange={(e) =>
            setAge(Number(e.target.value))
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="number"
          placeholder="Enter your age"
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Phone Number
        </label>
        <input
          onChange={(e) =>
            setPhone_number(e.target.value)
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="text"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Gender
        </label>
        <div className="relative">
          <select
            onChange={(e) =>
              setGender(e.target.value)
            }
            className="block appearance-none w-full border border-gray-300 rounded-lg text-gray-700 py-3 px-4 pr-8 leading-tight focus:border-green-400 focus:outline-none focus:bg-white"
            id="grid-state"
          >
            <option selected>Choose your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <FileUploaded
          onFileSelectSuccess={setDisplay_picture}
          // onFileSelectError={({ error }) => alert(error)}
        />
      {/* <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Profile picture
        </label>
        <input
          onChange={(e) =>
            setDisplay_picture(e.target.files[0])
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="file"
          value={display_picture}
        />
      </div> */}
      <div className="flex items-center justify-between"></div>
        <button
          type="submit"
          className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
        >
          Register
        </button>
    </form>
  );
}
