import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.PNG";
import { isLogin } from "../stores/actions/actionDoctorUser";

export default function Navbar() {
	let isLogged = useSelector((state) => state.doctorUser.isLogin);
	const history = useHistory();
	const dispatch = useDispatch();
	const logOut = () => {
		localStorage.clear();
		dispatch(isLogin(""));
		// history.push('/sign-in')
	};
	const access_token = localStorage.getItem("access_token");
	console.log(isLogged, "ini di navbar");
	useEffect(() => {
		if (!access_token) {
			dispatch(isLogin(""));
			history.push("/sign-in");
		} else if (access_token) {
			const type = localStorage.getItem("UserId") ? "user" : "doctor";
			dispatch(isLogin(type));
		}
	}, [access_token]);

	return (
		<div className="w-full fixed top-0 z-50 bg-gray-100">
			<nav className="flex items-center justify-between p-6 h-20 bg-white bg-opacity-50 shadow-xl">
				<NavLink to="/">
					<img src={logo} alt="logo" className="w-44" />
				</NavLink>
				<ul>
					<li className="text-xl">
						{isLogged === "doctor" ? (
							<>
								<NavLink
									to="/doctors/patient"
									className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
								>
									Home
								</NavLink>
								<NavLink
									to="/doctors/history"
									className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
								>
									History
								</NavLink>
							</>
						) : (
							<>
								<NavLink
									to="/"
									className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
								>
									Home
								</NavLink>
								<NavLink
									to="/doctors/list"
									className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
								>
									Doctors
								</NavLink>
							</>
						)}
						<NavLink to="/sign-in" className="text-gray-700">
							<button
								className={
									isLogged
										? "hidden"
										: "visibile btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24 ml-5"
								}
							>
								Login
							</button>
						</NavLink>
						<NavLink to="/sign-up">
							<button
								className={
									isLogged
										? "hidden"
										: "btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24 ml-5"
								}
							>
								Sign up
							</button>
						</NavLink>
						<NavLink
							to="/user-profile"
							className={
								isLogged === "user"
									? "hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
									: "hidden"
							}
						>
							Profile
						</NavLink>
						<button
							onClick={logOut}
							className={
								isLogged
									? "btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24 ml-5"
									: "hidden"
							}
						>
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
}

// import { NavLink } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import "../App.css";
// import logo from "../assets/logo.PNG";
// import { isLogin } from "../stores/actions/actionDoctorUser";
// import { updateStatusDoctor } from "../stores/actions/actionDoctors";

// export default function Navbar() {
// 	let isLogged = useSelector((state) => state.doctorUser.isLogin);
// 	const history = useHistory();
// 	const dispatch = useDispatch();
// 	const logOut = () => {
// 		if (isLogged === "doctor") {
// 			dispatch(
// 				updateStatusDoctor({
// 					_id: localStorage.getItem("DoctorId"),
// 					access_token: localStorage.getItem("access_token"),
// 					status: "Offline",
// 				})
// 			);
// 		}
// 		localStorage.clear();
// 		dispatch(isLogin(""));
// 		// history.push('/sign-in')
// 	};
// 	const access_token = localStorage.getItem("access_token");
// 	useEffect(() => {
// 		if (!access_token) {
// 			dispatch(isLogin(""));
// 			history.push("/sign-in");
// 		} else if (access_token) {
// 			const type = localStorage.getItem("UserId") ? "user" : "doctor";
// 			dispatch(isLogin(type));
// 		}
// 	}, [access_token]);

// 	return (
// 		<div className="w-full fixed top-0 z-50 bg-gray-100">
// 			<nav className="flex items-center justify-between p-6 h-20 bg-white bg-opacity-50 shadow-xl">
// 				<NavLink to="/">
// 					<img src={logo} alt="logo" className="w-44" />
// 				</NavLink>
// 				<ul>
// 					<li className="space-x-5 text-xl">
// 						{isLogged === "doctor" ? (
// 							<>
// 								<NavLink
// 									to="/doctors/patient"
// 									className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
// 								>
// 									Home
// 								</NavLink>
// 								<NavLink
// 									to="/doctors/history"
// 									className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
// 								>
// 									History
// 								</NavLink>
// 							</>
// 						) : (
// 							<>
// 								<NavLink
// 									to="/"
// 									className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
// 								>
// 									Home
// 								</NavLink>
// 								<NavLink
// 									to="/doctors/list"
// 									className="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
// 								>
// 									Doctors
// 								</NavLink>
// 							</>
// 						)}
// 						<NavLink to="/sign-in" className="text-gray-700">
// 							<button
// 								className={
// 									isLogged
// 										? "hidden"
// 										: "visibile btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
// 								}
// 							>
// 								Login
// 							</button>
// 						</NavLink>
// 						<NavLink to="/sign-up">
// 							<button
// 								className={
// 									isLogged
// 										? "hidden"
// 										: "btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
// 								}
// 							>
// 								Sign up
// 							</button>
// 						</NavLink>
// 						<NavLink
// 							to="/user-profile"
// 							className={
// 								isLogged === "user"
// 									? "hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
// 									: "hidden"
// 							}
// 						>
// 							Profile
// 						</NavLink>
// 						<button
// 							onClick={logOut}
// 							className={
// 								isLogged
// 									? "btn btn-outline1 hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold w-24"
// 									: "hidden"
// 							}
// 						>
// 							Logout
// 						</button>
// 					</li>
// 				</ul>
// 			</nav>
// 		</div>
// 	);
// }
