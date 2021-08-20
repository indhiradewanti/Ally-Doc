const UserModel = require("../models/User.js");
const { hashPassword, checkPassword } = require("../helpers/password.js");
const imageKit = require("../helpers/imagekit.js");
const { jwtSign } = require("../helpers/jwt.js");

class MainController {
	static async createUser(req, res, next) {
		try {
			if (!req.file) {
				throw { code: 400, message: "No file chosen" };
			}
			let uploadedImage = await imageKit(
				req.file.buffer,
				req.file.originalname
			);
			let newPassword = req.body.password
				? hashPassword(req.body.password)
				: req.body.password;
			const newUser = new UserModel({
				email: req.body.email,
				password: newPassword,
				username: req.body.username,
				display_picture: uploadedImage.url,
				height: req.body.height,
				weight: req.body.weight,
				age: req.body.age,
				phone_number: req.body.phone_number,
				gender: req.body.gender,
			});
			let createdNewUser = await newUser.save();
			let access_token = jwtSign(
				createdNewUser._id,
				createdNewUser.email,
				createdNewUser.role
			);
			res.status(201).json({ access_token });
		} catch (err) {
			if (err.code) {
				next(err);
			} else if (err.name === "ValidationError") {
				let errorMessages = [];
				for (let key in err.errors) {
					errorMessages.push(err.errors[key].message);
				}
				let errorOutput =
					errorMessages.length > 1
						? errorMessages.join(", ")
						: errorMessages[0];
				next({ code: 400, msg: errorOutput });
			} else {
				next({ code: 500 });
			}
		}
	}

	static async loginUser(req, res, next) {
		try {
			let { email, password } = req.body;
			if (!email) {
				throw {
					code: 400,
					msg: `Email is required`,
				};
			}
			if (!password) {
				throw {
					code: 400,
					msg: `Password is required`,
				};
			}
			let foundUser = await UserModel.findOne({ email });
			if (!foundUser) {
				throw {
					code: 400,
					msg: `Invalid email/password`,
				};
			}
			let checkedPassword = checkPassword(password, foundUser.password);
			if (!checkedPassword) {
				throw {
					code: 400,
					msg: `Invalid email/password`,
				};
			}
			let access_token = jwtSign(
				foundUser._id,
				foundUser.email,
				foundUser.role
			);
			res.status(200).json({ access_token });
		} catch (err) {
			if (err.code) {
				next(err);
			} else {
				next({ code: 500 });
			}
		}
	}

	static async findAllUsers(req, res, next) {
		try {
			let foundListUsers = await UserModel.find(
				{},
				{ payment: 0, password: 0 }
			);
			res.status(200).json(foundListUsers);
		} catch (err) {
			next({ code: 500 });
		}
	} // Admin

	static async findUser(req, res, next) {
		try {
			let { id } = req.params;
			let foundUser = await UserModel.findById(
				{ _id: id },
				{ password: 0 }
			);
			if (!foundUser) {
				throw { code: 404, msg: `User not found` };
			}
			res.status(200).json(foundUser);
		} catch (err) {
			if (err.code) {
				next(err);
			} else {
				next({ code: 500 });
			}
		}
	} // User

	static async updateUserImage(req, res, next) {
		try {
			let { id } = req.params;
			if (!req.file) {
				throw { code: 400, msg: "No file chosen" };
			}
			let uploadedImage = await imageKit(
				req.file.buffer,
				req.file.originalname
			);
			let updateUser = await UserModel.updateOne(
				{ _id: id },
				{
					$set: {
						display_picture: uploadedImage.url,
					},
				}
			);
			res.status(201).json({
				msg: `Profile picture updated successfully`,
			});
		} catch (err) {
			if (err.code) {
				next(err);
			} else {
				next({ code: 500 });
			}
		}
	} // User

	static async updateUser(req, res, next) {
		try {
			let { id } = req.params;
			let { email, height, weight, age, phone_number, gender } = req.body;
			if (!email) {
				throw { code: 400, msg: `Email cannot be empty` };
			}
			if (!height) {
				throw { code: 400, msg: `Height cannot be empty` };
			}
			if (!weight) {
				throw { code: 400, msg: `Weight cannot be empty` };
			}
			if (!age) {
				throw { code: 400, msg: `Age cannot be empty` };
			}
			if (!phone_number) {
				throw { code: 400, msg: `phone_number Number cannot be empty` };
			}
			let updateUser = await UserModel.updateOne(
				{ _id: id },
				{
					$set: {
						email,
						height,
						weight,
						age,
						phone_number,
						gender,
					},
				}
			);
			let updatedUser = await UserModel.findById(
				{ _id: id },
				{ password: 0 }
			);
			res.status(201).json(updatedUser);
		} catch (err) {
			if (err.code) {
				next(err);
			} else {
				next({ code: 500 });
			}
		}
	} // User

	static async updateUserPayment(req, res, next) {
		try {
			let { id } = req.params;
			let { card_number, cvv, expiry_month, expiry_year } = req.body;
			if (!card_number) {
				throw {
					code: 400,
					msg: `Card Number cannot be empty`,
				};
			}
			if (!cvv) {
				throw {
					code: 400,
					msg: `CVV cannot be empty`,
				};
			}
			if (!expiry_month) {
				throw {
					code: 400,
					msg: `Expiry month cannot be empty`,
				};
			}
			if (!expiry_year) {
				throw {
					code: 400,
					msg: `Expiry year cannot be empty`,
				};
			}
			let updateUserCard = await UserModel.updateOne(
				{ _id: id },
				{
					$set: {
						payment: {
							card_number,
							cvv,
							expiry_month,
							expiry_year,
						},
					},
				}
			);
			res.status(201).json({ msg: `Payment updated successfully` });
		} catch (err) {
			if (err.code) {
				next(err);
			} else {
				next({ code: 500 });
			}
		}
	} // User

	static async deleteUser(req, res, next) {
		try {
			let { id } = req.params;
			let deleteUser = await UserModel.deleteOne({ _id: id });
			if (!deleteUser.deletedCount) {
				throw { code: 404, msg: `User not found` };
			}
			res.status(200).json({ msg: `User deleted successfully` });
		} catch (err) {
			if (err.code) {
				next(err);
			} else {
				next({ code: 500 });
			}
		}
	} // User
}

module.exports = MainController;
