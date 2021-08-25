import { useState } from "react";
import "../App.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { userDoctor } from "../stores/actions/actionDoctorUser";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../stores/actions/actionDoctorUser.js";
import Swal from "sweetalert2";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#000000",
			color: "#000000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "24px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#000000" },
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee",
		},
	},
	hidePostalCode: true,
};

export default function Payment() {
	const [data, setData] = useState({
		nama: "",
		no: "",
		expMonth: "",
		expYear: "",
		cvv: "",
	});
	const history = useHistory();
	const { nama, no, expMonth, expYear, cvv } = data;
	const input = (e) => {
		let { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	// const handleSubmit = () => {};
	const { id: idDoctor } = useParams();
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const doctorData = useSelector((state) => {
		return state.doctors.allDoctor.find((doc) => doc._id === idDoctor);
	});
	const historyData = useSelector((state) => {
		return state.doctorUser.allUserDoctors.filter(
			(data) => data.doctorId === idDoctor
		);
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});

		// console.log(elements.getElement(CardElement));

		if (!error) {
			try {
				const { id } = paymentMethod;
				const response = await axios.post(
					"http://34.207.67.233:3000/user/payment",
					{
						amount: doctorData.price * 100,
						id,
					}
				);
				if (response.data.success) {
					console.log("Successful payment");
					Swal.fire({
						icon: "success",
						title: "Payment successful",
						text: "Thankyou! Your payment has been received",
					});
					await dispatch(userDoctor(idDoctor));
					await dispatch(filter(idDoctor));
					history.push(`/chat/${idDoctor}`);
				}
			} catch (error) {
				console.log("Error", error);
			}
		} else {
			console.log(error.message);
		}
	};

	return (
		<div className="justify-center bg-white place-content-center flex flex-row">
			<div className="min-w-screen min-h-screen items-center justify-center px-5 pb-10 pt-16 max-ww content-center flex new-width mr-10">
				<div className="w-full mx-auto rounded-lg new-bg p-5 text-gray-700 shadow-2xl my-auto">
					<div className="w-full pt-1 pb-5">
						<div className="bg-gray-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
								/>
							</svg>
						</div>
					</div>
					<div className="mb-10">
						<h1 className="text-center font-bold text-3xl uppercase meg">
							Secure payment info
						</h1>
					</div>
					<form onSubmit={handleSubmit}>
						<fieldset className="FormGroup">
							<div className="FormRow">
								<CardElement options={CARD_OPTIONS} />
							</div>
						</fieldset>
						<div>
							<button className="mt-10 block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-700 focus:bg-gray-700 text-white rounded-lg px-3 py-3 font-semibold">
								PAY NOW
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="flex flex-col justify-center mt-8">
				<div className="space-y-10">
					<div className="transition-transform transform rounded-xl hover:scale-110 shadow-2xl">
						<div className="container flex justify-center">
							<div className="p-3 bg-white rounded-xl max-w-lg hover:shadow">
								<div className="flex justify-between w-full">
									<div className="ml-2">
										<div className="p-3 caslon">
											<h3 className="text-2xl">
												{doctorData.username}
											</h3>
											<span className="text-lg">
												{doctorData.specialist}
											</span>
										</div>
										<div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
											<div className="avatar">
												<div className=" rounded-full w-24 h-24">
													<img
														src={doctorData.photo}
														alt=""
													/>
												</div>
											</div>
											<div className="px-10">
												<span className="text-gray-400 block">
													Cost
												</span>
												<span className="font-bold text-black text-xl">
													Rp{doctorData.price}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
