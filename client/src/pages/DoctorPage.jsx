import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function DoctorPage() {
	const history = useHistory();

	const chatButton = () => {
		let idDoctor = localStorage.getItem("DoctorId");
		history.push(`/chat/${idDoctor}`);
	};

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
			<div class="flex justify-center mt-20">
				<div class="p-3 new-bg rounded-xl max-w-lg hover:shadow">
					<div class="flex justify-between w-full">
						<div class="ml-2">
							<div class="p-3">
								<h3 class="text-2xl">Nama Pasien</h3>
							</div>
							<div class="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
								<div class="avatar">
									<div class=" rounded-full w-24 h-24">
										<img
											src="https://i.imgur.com/CeVfZyY.jpg"
											alt=""
										/>
									</div>
								</div>
								<div class="px-10">
									<span class="text-gray-400 block">
										Gender
									</span>{" "}
									<span class="font-bold text-black text-xl">
										Umur
									</span>
								</div>
							</div>
							<button className="btn btn-outline1 hidden sm:inline-block text-white transition-transform transform hover:scale-110 hover:text-indigo-700 vogue font-bold w-32 mt-5">
								Chat now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
