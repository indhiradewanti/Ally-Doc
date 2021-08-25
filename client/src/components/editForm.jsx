import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDetailUser, updateUser } from "../stores/actions/actionUsers";
import { useParams } from "react-router-dom";

export default function EditForm() {

  const history = useHistory();
  const dispatch = useDispatch();
  const detailUser = useSelector(state => state.users.detailUser)
  useEffect(() => {
    dispatch(fetchDetailUser(localStorage.getItem('UserId')))
  },[detailUser])
  const [edittedUser, setEdittedUser] = useState({
    email: detailUser.email,
    height: detailUser.height,
    weight: detailUser.weight,
    age: detailUser.age,
    phone_number: detailUser.phone_number,
  },[]);
  
  const goToDetail = () => {
    history.push('/user-profile')
  }

  let id  = localStorage.getItem("UserId");
  const handleEdit = (e) => {
    e.preventDefault();
    // console.log(edittedUser, "editted user");
    dispatch(updateUser(edittedUser));
    Swal.fire({
      icon: 'success',
      title: 'Edit Success...'
    })
    setTimeout(goToDetail,2000)
  };

  return (
    <form onSubmit={handleEdit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 tracking-wide">
          Email
        </label>
        <input
          onChange={(e) =>
            setEdittedUser({ ...edittedUser, email: e.target.value })
          }
          className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="email"
          defaultValue={detailUser.email}
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Height
        </label>
        <input
          onChange={(e) =>
            setEdittedUser({
              ...edittedUser,
              height: Number(e.target.value),
            })
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="number"
          defaultValue={detailUser.height}
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Weight
        </label>
        <input
          onChange={(e) =>
            setEdittedUser({
              ...edittedUser,
              weight: Number(e.target.value),
            })
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="number"
          defaultValue={detailUser.weight}
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          age
        </label>
        <input
          onChange={(e) =>
            setEdittedUser({ ...edittedUser, age: Number(e.target.value) })
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="number"
          defaultValue={detailUser.age}
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Phone Number
        </label>
        <input
          onChange={(e) =>
            setEdittedUser({ ...edittedUser, phone_number: e.target.defaultValue })
          }
          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          type="text"
          defaultValue={detailUser.phone_number}
        />
      </div>
      <div> 
        <button
          type="submit"
          className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
        >
          Edit
        </button>
      </div>
    </form>
  );
}