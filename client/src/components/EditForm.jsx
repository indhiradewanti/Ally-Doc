import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDetailUser, updateUser } from "../stores/actions/actionUsers";

export default function EditForm() {
	const history = useHistory();
	const dispatch = useDispatch();
	const detailUser = useSelector((state) => state.users.detailUser);
	useEffect(() => {
		dispatch(fetchDetailUser(localStorage.getItem("UserId")));
	}, []);
	const [edittedUser, setEdittedUser] = useState(
		{
			email: detailUser.email,
			gender: detailUser.gender,
			height: detailUser.height,
			weight: detailUser.weight,
			age: detailUser.age,
			phone_number: detailUser.phone_number,
		},
		[]
	);

	const goToDetail = () => {
		history.push("/user-profile");
	};

	let id = localStorage.getItem("UserId");
	const handleEdit = (e) => {
		e.preventDefault();
		// console.log(edittedUser, "editted user");
		dispatch(updateUser(edittedUser));
		Swal.fire({
			icon: "success",
			title: "Edit Success...",
		});
		setTimeout(goToDetail, 2000);
	};

	return (
		<form
			onSubmit={handleEdit}
			id="profile"
			className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-lg shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
		>
			<div className="p-4 md:p-12 text-center lg:text-left -mt-2 ">
				<h1 className="text-4xl font-bold pt-8 lg:pt-0 caslon text-center">
					Edit Profile
				</h1>
				<div className="w-24 h-2 bg-nude1 mb-4 mx-auto mt-3"></div>
				<div className="grid grid-cols-1 mx-7">
					<label className="text-lg text-gray-500 text-light caslon">
						Email
					</label>
					<input
						onChange={(e) =>
							setEdittedUser({
								...edittedUser,
								email: e.target.value,
							})
						}
						className="py-1 px-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						type="email"
						placeholder="mail@gmail.com"
						defaultValue={detailUser.email}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-2 mx-7">
					<div className="grid grid-cols-1">
						<label className="text-lg text-gray-500 text-light caslon">
							Height
						</label>
						<input
							onChange={(e) =>
								setEdittedUser({
									...edittedUser,
									height: Number(e.target.value),
								})
							}
							defaultValue={detailUser.height}
							className="py-1 px-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							type="number"
							placeholder="cm"
						/>
					</div>
					<div className="grid grid-cols-1">
						<label className="text-lg text-gray-500 text-light caslon">
							Weight
						</label>
						<input
							onChange={(e) =>
								setEdittedUser({
									...edittedUser,
									weight: Number(e.target.value),
								})
							}
							className="py-1 px-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							type="number"
							placeholder="kg"
							defaultValue={detailUser.weight}
						/>
					</div>
					<div className="grid grid-cols-1">
						<label className="text-lg text-gray-500 text-light caslon">
							Age
						</label>
						<input
							onChange={(e) =>
								setEdittedUser({
									...edittedUser,
									age: Number(e.target.value),
								})
							}
							className="py-1 px-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							type="number"
							placeholder="yo"
							defaultValue={detailUser.age}
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 mt-2 mx-7">
					<label className="text-lg text-gray-500 text-light caslon">
						Phone Number
					</label>
					<input
						onChange={(e) =>
							setEdittedUser({
								...edittedUser,
								phone_number: e.target.defaultValue,
							})
						}
						className="py-1 px-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						type="text"
						placeholder="Enter your phone number"
						defaultValue={detailUser.phone_number}
					/>
				</div>
				<div className="flex items-center justify-center mt-5">
					<button
						type="submit"
						className="btn btn-outline2 hidden sm:inline-block text-white w-32 vogue"
					>
						S U B M I T
					</button>
				</div>
			</div>
		</form>
	);
}

// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { fetchDetailUser, updateUser } from "../stores/actions/actionUsers";
// import {
//   useParams
// } from "react-router-dom";

// export default function EditForm() {
//   let {id} = useParams()
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const detailUser = useSelector((state) => state.users.detailUser);
//   const [edittedUser, setEdittedUser] = useState({
//     email: detailUser.email,
//     height: detailUser.height,
//     weight: detailUser.weight,
//     age: detailUser.age,
//     phone_number: detailUser.age,
//   });

//   useEffect(() => {
//     dispatch(fetchDetailUser(id));
//   });

//   const handleEdit = async (e) => {
//     e.preventDefault();
//     await dispatch(updateUser(edittedUser));
//   };
//   return (
//     <form onSubmit={handleEdit} className="space-y-5">
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700 tracking-wide">
//           Email
//         </label>
//         <input
//           onChange={(e) =>
//             setEdittedUser({ ...edittedUser, email: e.target.value })
//           }
//           className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
//           type="email"
//           value={detailUser.email}
//         />
//       </div>
//       <div className="space-y-2">
//         <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
//           Height
//         </label>
//         <input
//           onChange={(e) =>
//             setEdittedUser({
//               ...edittedUser,
//               height: Number(e.target.value),
//             })
//           }
//           className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
//           type="number"
//           value={detailUser.height}
//         />
//       </div>
//       <div className="space-y-2">
//         <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
//           Weight
//         </label>
//         <input
//           onChange={(e) =>
//             setEdittedUser({
//               ...edittedUser,
//               weight: Number(e.target.value),
//             })
//           }
//           className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
//           type="number"
//           value={detailUser.weight}
//         />
//       </div>
//       <div className="space-y-2">
//         <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
//           age
//         </label>
//         <input
//           onChange={(e) =>
//             setEdittedUser({ ...edittedUser, age: Number(e.target.value) })
//           }
//           className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
//           type="number"
//           value={detailUser.age}
//         />
//       </div>
//       <div className="space-y-2">
//         <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
//           Phone Number
//         </label>
//         <input
//           onChange={(e) =>
//             setEdittedUser({ ...edittedUser, phone_number: e.target.value })
//           }
//           className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
//           type="text"
//           value={detailUser.phone_number}
//         />
//       </div>
//       <div>
//         <button
//           type="submit"
//           className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
//         >
//           Edit
//         </button>
//       </div>
//     </form>
//   );
// }
