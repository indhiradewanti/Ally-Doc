// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDetailUser } from "../stores/actions/actionUsers";

// export default function UserDetail() {
//   const dispatch = useDispatch();
//   const detailUser = useSelector((state) => state.users.detailUser);
//   useEffect(() => {
//     dispatch(fetchDetailUser());
//   }, [detailUser]);

//   console.log(detailUser,'detailUser')

//   return (
//     <div class="new-bg h-full font-sans antialiased">
//     <div class="flex items-center h-auto flex-wrap mx-auto">
//     <div class="container mx-auto mt-52 mb-20">
//         <div>
//             <div class="bg-white relative shadow-xl w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
//                 <div class="flex justify-center">
//                         <img src={detailUser.photo} alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-2xl border-4 border-white"/>
//                 </div>

//                 <div class="mt-16">
//                     <h1 class="font-bold text-center text-3xl text-gray-900">{detailUser.username}</h1>

//                     <p>
//                         <span>

//                         </span>
//                     </p>
//                     <div class="my-5">
//                         <a href="#" class="text-indigo-200 block text-center font-medium leading-6 px-6 py-3 bg-indigo-600">Connect with <span class="font-bold">@eduardpantazi</span></a>
//                     </div>
//                     <div class="flex justify-evenly my-5">
//                         <a href="" class="bg font-bold text-sm text-blue-800 w-full text-center py-3 hover:bg-blue-800 hover:text-white hover:shadow-lg">Facebook</a>
//                         <a href="" class="bg font-bold text-sm text-blue-400 w-full text-center py-3 hover:bg-blue-400 hover:text-white hover:shadow-lg">Twitter</a>
//                         <a href="" class="bg font-bold text-sm text-yellow-600 w-full text-center py-3 hover:bg-yellow-600 hover:text-white hover:shadow-lg">Instagram</a>
//                         <a href="" class="bg font-bold text-sm text-gray-600 w-full text-center py-3 hover:bg-gray-600 hover:text-white hover:shadow-lg">Email</a>
//                     </div>

//                     <div class="w-full">
//                         <h3 class="font-bold text-gray-600 text-left px-4">Recent activites</h3>
//                         <div class="mt-5 w-full">
//                             <a href="#" class="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
//                                 <img src="https://pantazisoft.com/img/avatar-2.jpeg" alt="" class="rounded-full h-6 shadow-md inline-block mr-2"/>
//                                     Updated his status
//                                     <span class="text-gray-400 text-sm">24 min ago</span>
//                             </a>

//                             <a href="#" class="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
//                                 <img src="https://pantazisoft.com/img/avatar-2.jpeg" alt="" class="rounded-full h-6 shadow-md inline-block mr-2"/>
//                                     Added new profile picture
//                                     <span class="text-gray-400 text-sm">42 min ago</span>
//                             </a>

//                             <a href="#" class="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
//                                 <img src="https://pantazisoft.com/img/avatar-2.jpeg" alt="" class="rounded-full h-6 shadow-md inline-block mr-2"/>
//                                 Posted new article in <span class="font-bold">Web Dev</span>
//                                 <span class="text-gray-400 text-sm">49 min ago</span>
//                             </a>

//                             <a href="#" class="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
//                                 <img src="https://pantazisoft.com/img/avatar-2.jpeg" alt="" class="rounded-full h-6 shadow-md inline-block mr-2"/>
//                                 Edited website settings
//                                 <span class="text-gray-400 text-sm">1 day ago</span>
//                             </a>

//                             <a href="#" class="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
//                                 <img src="https://pantazisoft.com/img/avatar-2.jpeg" alt="" class="rounded-full h-6 shadow-md inline-block mr-2"/>
//                                 Added new rank
//                                 <span class="text-gray-400 text-sm">5 days ago</span>
//                             </a>

//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     </div>
// </div>
// </div>
//   );
// }

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, useParams, useRouteMatch, Route, NavLink } from "react-router-dom";
import EditForm from "../components/editForm";
import ProfileUser from "../components/ProfileUser";
import { fetchDetailUser } from "../stores/actions/actionUsers";

export default function UserDetail() {
  const _id = localStorage.getItem("_id");
  const dispatch = useDispatch();
  const detailUser = useSelector((state) => state.users.detailUser);
  useEffect(() => {
    dispatch(fetchDetailUser(_id));
  }, []);

  console.log(detailUser, "detailUser");
  console.log(_id);
  let { path, url } = useRouteMatch();
  return (
    <div className="containers mx-40 my-20 h-screen">
      <div className="grid grid-cols-4 bg-white gap-2 justify-center h-3/4 p-4 rounded-xl">
        <div className="col-span-1 shadow-xl px-10">
          <div className="flex w-full mt-10 relative">
            <img src={detailUser.display_picture} className="m-auto rounded" alt="" />
          </div>
          <ul>
            <li>
              <NavLink to={`${url}/profile-user`}>Profile User</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/edit-user`}>Edit User</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/edit-image`}>Edit Profile Picture</NavLink>
            </li>
          </ul>
        </div>
        <div className="col-span-3 shadow-xl p-4 space-y-2">
          <Switch>
            <Route exact path={path}>
              <ProfileUser detailUser={detailUser} />
            </Route>
            <Route exact path={`${path}/profile-user`}>
              <ProfileUser detailUser={detailUser} />
            </Route>
            <Route exact path={`${path}/edit-user`}>
              <EditForm detailUser={detailUser} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
