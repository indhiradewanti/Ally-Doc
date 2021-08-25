import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchDataHistory } from "../stores/actions/actionHistory.js";
import { doctorHistory, filter } from "../stores/actions/actionDoctorUser.js";

export default function DoctorPage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const patientData = useSelector((state) => {
		return state.histories.allHistory.find(
			(history) => history.status === "in progress"
		);
	});
	console.log(patientData, "patientData");
	let idDoctor = localStorage.getItem("DoctorId");
	let access_token = localStorage.getItem("access_token");

	const chatButton = async () => {
		await dispatch(doctorHistory(patientData));
		await dispatch(filter(idDoctor));
		history.push(`/chat/${idDoctor}`);
	};

	useEffect(() => {
		dispatch(fetchDataHistory(access_token));
	}, []);

	return (
		<div className=" mt-20 h-screen">
			<div className="max-w-xl mx-auto text-center">
				<div className="w-24 h-2 bg-nude1 mb-4 mx-auto"></div>
				<h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 meg">
					Patient
				</h2>
				<p className="font-light text-gray-600 mb-6 leading-relaxed">
					your current patient
				</p>
			</div>
			<div className="flex justify-center mt-20">
				<div className="p-3 new-bg rounded-xl max-w-lg hover:shadow">
					<div className="flex justify-between w-full">
						<div className="ml-2">
							<div className="p-3">
								{patientData ? (
									<h3 className="text-2xl">
										{patientData.userName}
									</h3>
								) : (
									<h3 className="text-2xl">test</h3>
								)}
							</div>
							<div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
								<div className="avatar">
									<div className=" rounded-full w-24 h-24">
										<img
											src={patientData.userPhoto}
											alt=""
										/>
									</div>
								</div>
								<div className="px-10">
									{patientData ? (
										<span className="text-gray-400 block">
											{patientData.userGender}
										</span>
									) : (
										<span className="text-gray-400 block">
											test
										</span>
									)}
									{/* <span className="font-bold text-black text-xl">
										Umur
									</span> */}
								</div>
							</div>
							<button
								onClick={() => chatButton()}
								className="btn btn-outline1 hidden sm:inline-block text-white transition-transform transform hover:scale-110 hover:text-indigo-700 vogue font-bold w-32 mt-5"
							>
								Chat now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
