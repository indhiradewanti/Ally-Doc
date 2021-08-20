const axios = require("../helpers/axiosUser.js");

class UserController {
	static async createNewUser(req, res, next) {
		try {
			let newUserData = req.body;
			newUserData.display_picture = req.file;
			let createdUser = await axios({
				method: "POST",
				url: "/",
				data: newUserData,
			});
			// return access_token
		} catch (err) {
			console.log(err);
		}
	}

	static async loginUser(req, res, next) {
		try {
			let { email, password } = req.body;
			let loggedInUser = await axios({
				method: "POST",
				url: "/login",
				data: {
					email,
					password,
				},
			});
			// return access_token
		} catch (err) {
			console.log(err);
		}
	}

	static async findAllUsers(req, res, next) {
		try {
			let { access_token } = req.headers;
			let allUsersData = await axios({
				method: "GET",
				url: "/",
				headers: {
					access_token,
				},
			});
			// return all users data
		} catch (err) {
			console.log(err);
		}
	}

	static async findUserById(req, res, next) {
		try {
			let { id } = req.params;
			let { access_token } = req.headers;
			let foundUserById = await axios({
				method: "GET",
				url: `${id}`,
				headers: {
					access_token,
				},
			});
			// return user data
		} catch (err) {
			console.log(err);
		}
	}

	static async updateUserImage(req, res, next) {
		try {
			let { id } = req.params;
			let { access_token } = req.headers;
			let updatedUserImage = await axios({
				method: "PATCH",
				url: `/image/${id}`,
				data: {
					display_picture: req.file,
				},
				headers: {
					access_token,
				},
			});
			// return updated message
		} catch (err) {
			console.log(err);
		}
	}

	static async updateUserData(req, res, next) {
		try {
			let { email, height, weight, age, phone_number } = req.body;
			let { id } = req.params;
			let { access_token } = req.headers;
			let updatedUserData = await axios({
				method: "PATCH",
				url: `/${id}`,
				data: {
					email,
					height,
					weight,
					age,
					phone_number,
				},
				headers: {
					access_token,
				},
			});
			// return returned updated data
		} catch (err) {
			console.log(err);
		}
	}

	static async updateUserPayment(req, res, next) {
		try {
			let { card_number, cvv, expiry_month, expiry_year } = req.body;
			let { id } = req.params;
			let { access_token } = req.headers;
			let updatedUserPayment = await axios({
				method: "PATCH",
				url: `/payment/${id}`,
				data: {
					card_number,
					cvv,
					expiry_month,
					expiry_year,
				},
				headers: {
					access_token,
				},
			});
			// return success string
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteUser(req, res, next) {
		try {
			let { id } = req.params;
			let { access_token } = req.headers;
			let deletedUserData = await axios({
				method: `/${id}`,
				headers: {
					access_token,
				},
			});
			// return success string
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = UserController;
