import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { regisUser } from "../stores/actions/actionUsers";
import FileUploaded from "./FileUploader";

export default function RegisterForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.users.accessToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [phone_number, setPhone_number] = useState("");
  const [gender, setGender] = useState("");
  const [display_picture, setDisplay_picture] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("age", age);
    formData.append("phone_number", phone_number);
    formData.append("gender", gender);
    formData.append("display_picture", display_picture);
    dispatch(regisUser(formData));
  };

  if (isLogin) {
    Swal.fire({
      icon: "success",
      title: "Register success",
    });
    history.push("/");
  }
console.log(email, password, username, height, weight, age, phone_number, gender, display_picture);
  return (
    <form action=""  onSubmit={handleRegister} >
      <div class="grid grid-cols-1 mt-5 mx-7">
        <label class="text-lg text-gray-500 text-light caslon">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="email"
          placeholder="mail@gmail.com"
        />
      </div>
      <div class="grid grid-cols-1 mt-5 mx-7">
        <label class="text-lg text-gray-500 text-light caslon">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <div class="grid grid-cols-1 mt-5 mx-7">
        <label class="text-lg text-gray-500 text-light caslon">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          placeholder="Enter your username"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-5 mx-7">
        <div class="grid grid-cols-1">
          <label class="text-lg text-gray-500 text-light caslon">height</label>
          <input
            onChange={(e) => setHeight(Number(e.target.value))}
            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="number"
            placeholder="cm"
          />
        </div>
        <div class="grid grid-cols-1">
          <label class="text-lg text-gray-500 text-light caslon">Weight</label>
          <input
            onChange={(e) => setWeight(Number(e.target.value))}
            class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="number"
            placeholder="kg"
          />
        </div>
        <div class="grid grid-cols-1">
          <label class="text-lg text-gray-500 text-light caslon">Age</label>
          <input onChange={(e) => setAge(Number(e.target.value))} class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="number" placeholder="yo" />
        </div>
      </div>
      <div class="grid grid-cols-1 mt-5 mx-7">
        <label class="text-lg text-gray-500 text-light caslon">Gender</label>
        <select onChange={(e) => setGender(e.target.value)} class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
          <option selected disabled="true" >Choose your gender</option>
          <option value="male">
            Male
          </option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="grid grid-cols-1 mt-5 mx-7">
        <label class="text-lg text-gray-500 text-light caslon">Phone Number</label>
        <input
          onChange={(e) => setPhone_number(e.target.value)}
          class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          placeholder="Enter your phone number"
        />
      </div>
      <FileUploaded onFileSelectSuccess={setDisplay_picture} />
      <div class="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
        <button type="submit" className="w-full flex justify-center btn btn-outline1 text-gray-100  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 text-center caslon align">
          Create Account
        </button>
      </div>
    </form>
  );
}
