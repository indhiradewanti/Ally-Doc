const axios = require("../helpers/axiosUser.js");

class UserController {
	static async createNewUser(req, res, next) {
		try {
			// turn form data to urlencoded using multer
			// return access token
		} catch (err) {
			console.log(err);
		}
	}

	static async loginUser(req, res, next) {
		try {
			// send email and password
			// return access token
		} catch (err) {
			console.log(err);
		}
	}

	static async findAllUsers(req, res, next) {
		try {
			// send nothing
			// return list of all users
		} catch (err) {
			console.log(err);
		}
	}

	static async findUserById(req, res, next) {
		try {
			// send user id
			// return user data
		} catch (err) {
			console.log(err);
		}
	}

	static async updateUserData(req, res, next) {
		try {
			// send updated data
			// return returned updated data
		} catch (err) {
			console.log(err);
		}
	}

	static async updateUserPayment(req, res, next) {
		try {
			// send payment data
			// return success string
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteUser(req, res, next) {
		try {
			// Send user id
			// return success string
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = UserController;
