import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchDataHistory } from "../stores/actions/actionHistory";
import { useDispatch } from "react-redux";

export default function DoctorPage() {
	const dispatch = useDispatch();
	const patientsHistory = useSelector((state) => state.histories.allHistory);
	const access_token = localStorage.getItem("access_token");

	console.log(patientsHistory);
	useEffect(() => {
		dispatch(fetchDataHistory(access_token));
	}, []);

	return (
		<div className="bg-white h-full justify-center place-content-center flex">
			<div className=" mt-32 h-screen">
				<div className="max-w-xl mx-auto text-center">
					<div className="w-24 h-2 bg-nude1 mb-4 mx-auto"></div>
					<h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 meg">
						History
					</h2>
					<p className="font-light text-gray-600 mb-6 leading-relaxed">
						your patients history
					</p>
				</div>
				<div className="grid grid-cols-4 gap-8 mt-20">
					{patientsHistory.length ? (
						patientsHistory.map((patient) => (
							<>
								<div className="flex justify-center">
									<div className="p-3 new-bg rounded-xl max-w-lg hover:shadow">
										<div className="flex justify-between w-full">
											<div className="ml-2">
												<div className="p-3">
													<h3 className="text-2xl">
														{patient.userName
															? patient.userName
															: "Username"}
													</h3>
												</div>
												<div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
													<div className="avatar">
														<div className=" rounded-full w-24 h-24">
															{patient.userPhoto ? (
																<img
																	src={
																		patient.userPhoto
																	}
																	alt="patients-photo"
																/>
															) : (
																<img
																	src="https://idekukreatif.com/wp-content/uploads/2020/05/loading-gif.gif"
																	alt=""
																/>
															)}
														</div>
													</div>
													<div className="px-10">
														<span className="text-gray-400 block">
															{patient.userGender
																? patient.userGender
																: "Gender"}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						))
					) : (
						<h1>Loading...</h1>
					)}
				</div>
			</div>
		</div>
	);
}
