import { useState } from "react";
import "../App.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { userDoctor } from "../stores/actions/actionDoctorUser";
import {useDispatch} from 'react-redux'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	},
    hidePostalCode: true
}

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
  const {id: idDoctor} = useParams()
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log(elements.getElement(CardElement));

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log(id);
        const response = await axios.post(
          "http://34.207.67.233:3000/user/payment",
          {
            amount: 100000 * 100,
            id,
          }
        );

        if (response.data.success) {
          console.log("Successful payment");
          dispatch(userDoctor(idDoctor))
          history.push(`/chat/${idDoctor}`)
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="justify-center bg-gray-200 mt-20 place-content-center flex flex-row">
      <div>
        <div className="min-w-screen min-h-screen items-center justify-center px-5 pb-10 pt-16 max-ww content-center">
          <div className="w-full mx-auto rounded-lg new-bg p-5 text-gray-700 shadow-2xl">
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
              <h1 className="text-center font-bold text-xl uppercase meg">
                Secure payment info
              </h1>
            </div>
            <div className="mb-3 flex -mx-2">
              <div className="px-2">
                <label
                  htmlFor="type1"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-gray-500"
                    name="type"
                    id="type1"
                  />
                  <img
                    src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                    alt=""
                    className="h-8 ml-3"
                  />
                </label>
              </div>
              <div className="px-2">
                <label
                  htmlFor="type2"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-gray-500"
                    name="type"
                    id="type2"
                  />
                  <img
                    src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                    alt=""
                    className="h-8 ml-3"
                  />
                </label>
              </div>
            </div>
              <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                  <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                  </div>
                </fieldset>
                <div>
              <button className="block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-700 focus:bg-gray-700 text-white rounded-lg px-3 py-3 font-semibold">
                <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
              </button>
            </div>
              </form>
            {/* <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
              <div>
                <input onChange={input} name="nama" className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors" placeholder="John Smith" type="text" />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Card number</label>
              <div>
                <input
                  onChange={input}
                  name="no"
                  className=" form-control w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors"
                  placeholder="0000 0000 0000 0000"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9\s]{13,19}"
                  autoComplete="cc-number"
                  maxLength="19"
                />
              </div>
            </div>
            <div className="mb-3 -mx-2 flex items-end">
              <div className="px-2 w-1/2">
                <label className="font-bold text-sm mb-2 ml-1">Expiration date</label>
                <div>
                  <select onChange={input} name="expMonth" className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors cursor-pointer">
                    <option value="01">01 - January</option>
                    <option value="02">02 - February</option>
                    <option value="03">03 - March</option>
                    <option value="04">04 - April</option>
                    <option value="05">05 - May</option>
                    <option value="06">06 - June</option>
                    <option value="07">07 - July</option>
                    <option value="08">08 - August</option>
                    <option value="09">09 - September</option>
                    <option value="10">10 - October</option>
                    <option value="11">11 - November</option>
                    <option value="12">12 - December</option>
                  </select>
                </div>
              </div>
              <div className="px-2 w-1/2">
                <select onChange={input} name="expYear" className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors cursor-pointer">
                  <option value="20">2020</option>
                  <option value="21">2021</option>
                  <option value="22">2022</option>
                  <option value="23">2023</option>
                  <option value="24">2024</option>
                  <option value="25">2025</option>
                  <option value="26">2026</option>
                  <option value="27">2027</option>
                  <option value="28">2028</option>
                  <option value="29">2029</option>
                </select>
              </div>
            </div>
            <div className="mb-10">
              <label className="font-bold text-sm mb-2 ml-1">Security code</label>
              <div>
                <input name="cvv" onChange={input} maxLength="3" typeof="number" className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors" placeholder="000" type="text" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center -mt-20">
        <div className="space-y-10">
          <div className="w-96 h-56 m-auto bg-gray-900 rounded-xl relative text-white transition-transform transform hover:scale-110">
            <img
              className="relative object-cover w-full h-full rounded-xl opacity-10"
              src="https://i.imgur.com/kGkSg1v.png"
              alt=""
            />
            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-light">Name</p>
                  <p className="font-medium tracking-widest">{nama}</p>
                </div>
                <img
                  className="w-14 h-14"
                  src="https://i.imgur.com/bbPHJVe.png"
                  alt=""
                />
              </div>
              <div className="pt-1">
                <p className="font-light">Card Number</p>
                <p className="font-medium tracking-more-wider">{no}</p>
              </div>
              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div className="">
                    <p className="font-light text-xs">Valid</p>
                    <p className="font-medium tracking-wider text-sm">-</p>
                  </div>
                  <div className="">
                    <p className="font-light text-xs">Expiry</p>
                    <p className="font-medium tracking-wider text-sm">
                      {expMonth}/{expYear}
                    </p>
                  </div>

                  <div className="">
                    <p className="font-light text-xs">CVV</p>
                    <p className="font-bold tracking-more-wider text-sm">
                      {cvv}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="transition-transform transform hover:scale-110">
            <div className="container flex justify-center">
              <div className="p-3 bg-white rounded-xl max-w-lg hover:shadow">
                <div className="flex justify-between w-full">
                  <div className="ml-2">
                    <div className="p-3">
                      <h3 className="text-2xl">Dr. siapa</h3>{" "}
                      <span>Spesialis apa</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
                      <div className="avatar">
                        <div className=" rounded-full w-24 h-24">
                          <img src="https://i.imgur.com/CeVfZyY.jpg" alt="" />
                        </div>
                      </div>
                      <div className="px-10">
                        <span className="text-gray-400 block">Cost</span>{" "}
                        <span className="font-bold text-black text-xl">
                          Rp30.000
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
