import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "../components/PaymentForm.jsx"

const PUBLIC_KEY = "pk_test_51JRftzFd2reQx6UCzCxmjxH6YU5l7MzpNSusvjRqtJYUCnylosvvAVldZHPijDeQBdHzFhQCuOYU3znh2SI0kPh000Ylmlomhf"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
