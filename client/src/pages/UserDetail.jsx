import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchDetailUser } from "../stores/actions/actionUsers";

export default function UserDetail() {
  const _id = localStorage.getItem('_id')
  const dispatch = useDispatch();
  const detailUser = useSelector((state) => state.users.detailUser);
  useEffect(() => {
    dispatch(fetchDetailUser(_id));
  }, [detailUser]);

  console.log(detailUser,'detailUser')
  console.log(_id)

  return (
    <div className="containers mx-40 my-20 h-screen">
      <div className="grid grid-cols-4 bg-white gap-2 justify-center h-3/4 p-4 rounded-xl">
        <div className="col-span-1 shadow-xl px-10">
          <div className="flex w-full h-full relative">
            <img
              src={detailUser.display_picture}
              className="w-96 h-96 m-auto rounded"
              alt=""
            />
          </div>
        </div>
        <div className="col-span-3 shadow-xl p-4 space-y-2">
          <h1 className="text-center text-2xl mb-10 font-semibold">
            User Profile
          </h1>
          <div className="flex justify-center">
            <div className="flex flex-col space-y-2">
              <p className="pb-1">Email :</p>
              <p className="pb-1">Name :</p>
              <p className="pb-2">Tinggi badan :</p>
              <p className="pb-1">Berat badan :</p>
              <p className="pb-2">Umur :</p>
              <p className="pb-2">Gender :</p>
              <p className="pb-1">No. Telp :</p>
            </div>
            <div className="flex flex-col ml-10 space-y-3">
              <div className="border rounded-xl py-0 px-2">
                {detailUser.email}
              </div>
              <div className="border rounded-xl px-2">
                {detailUser.username}
              </div>
              <div className="border rounded-xl px-2">{detailUser.height}</div>
              <div className="border rounded-xl px-2">{detailUser.weight}</div>
              <div className="border rounded-xl px-2">{detailUser.age}</div>
              <div className="border rounded-xl px-2">{detailUser.gender}</div>
              <div className="border rounded-xl px-2">
                {detailUser.phone_number}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
