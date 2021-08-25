import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Switch,
	useParams,
	useRouteMatch,
	Route,
	NavLink,
} from "react-router-dom";
import EditForm from "../components/EditForm";
import ProfileUser from "../components/ProfileUser";
import { fetchDetailUser } from "../stores/actions/actionUsers";

export default function UserDetail() {
	const _id = localStorage.getItem("UserId");
	const dispatch = useDispatch();
	const detailUser = useSelector((state) => state.users.detailUser);

	useEffect(() => {
		dispatch(fetchDetailUser(_id));
	}, [detailUser]);

	console.log(detailUser);
	let { path, url } = useRouteMatch();
	return (
		<div className="new-bg">
			<div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
				<Switch>
					<Route exact path={path}>
						<ProfileUser detailUser={detailUser} />
					</Route>
					<Route exact path={`${path}/edit-user`}>
						<EditForm detailUser={detailUser} />
					</Route>
				</Switch>
				<div className="ml-9 flex flex-col">
					<div className="avatar">
						<div className="mb-8 rounded-btn w-80 h-80">
							<img
								src={detailUser.display_picture}
								className=""
							/>
						</div>
					</div>
					<div className="flex flex-row justify-between">
						<NavLink to={`${path}`}>
							<button className="btn uppercase btn-outline2 hidden sm:inline-block text-white w-32 vogue">
								P r o f i l e
							</button>
						</NavLink>
						<NavLink to={`${url}/edit-user`}>
							<button className="btn btn-outline2 hidden sm:inline-block text-white w-32 vogue">
								E d i t
							</button>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDetailUser } from "../stores/actions/actionUsers";

// export default function UserDetail() {
// 	const dispatch = useDispatch();
// 	const detailUser = useSelector((state) => state.users.detailUser);

// 	useEffect(() => {
// 		dispatch(fetchDetailUser());
// 	}, []);

// 	return (
// 		<div className="containers mx-40 my-20 h-screen">
// 			<div className="grid grid-cols-4 bg-white gap-2 justify-center h-3/4 p-4 rounded-xl">
// 				<div className="col-span-1 shadow-xl ">
// 					<div className="flex w-full h-full relative">
// 						<img
// 							src={detailUser.display_picture}
// 							className="w-44 h-44 m-auto"
// 							alt=""
// 						/>
// 					</div>
// 				</div>
// 				<div className="col-span-3 shadow-xl p-4 space-y-2">
// 					<h1 className="text-center text-2xl mb-10 font-semibold">
// 						User Profile
// 					</h1>
// 					<div className="flex justify-center">
// 						<div className="flex flex-col space-y-2">
// 							<p className="pb-1">Email :</p>
// 							<p className="pb-1">Name :</p>
// 							<p className="pb-2">Tinggi badan :</p>
// 							<p className="pb-1">Berat badan :</p>
// 							<p className="pb-2">Umur :</p>
// 							<p className="pb-2">Gender :</p>
// 							<p className="pb-1">No. Telp :</p>
// 						</div>
// 						<div className="flex flex-col ml-10 space-y-3">
// 							<div className="border rounded-xl py-0 px-2">
// 								{detailUser.email}
// 							</div>
// 							<div className="border rounded-xl px-2">
// 								{detailUser.username}
// 							</div>
// 							<div className="border rounded-xl px-2">
// 								{detailUser.height}
// 							</div>
// 							<div className="border rounded-xl px-2">
// 								{detailUser.weight}
// 							</div>
// 							<div className="border rounded-xl px-2">
// 								{detailUser.age}
// 							</div>
// 							<div className="border rounded-xl px-2">
// 								{detailUser.gender}
// 							</div>
// 							<div className="border rounded-xl px-2">
// 								{detailUser.phone_number}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
