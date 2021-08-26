const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
	email: { type: String, required: [true, "Email is required"] },
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	username: { type: String, required: [true, "Username is required"] },
	role: { type: String, default: `User` },
	display_picture: String,
	height: { type: Number, required: [true, "Height is required"] },
	weight: { type: Number, required: [true, "Weight is required"] },
	age: { type: Number, required: [true, "Age is required"] },
	phone_number: {
		type: String,
		required: [true, "Phone Number is required"],
	},
	gender: String,
	payment: {
		card_number: {
			type: String,
			default: "",
		},
		cvv: { type: String, default: "" },
		expiry_month: { type: String, default: "" },
		expiry_year: { type: String, default: "" },
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Users", UserSchema);
