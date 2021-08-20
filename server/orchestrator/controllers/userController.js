const axios = require("../helpers/axiosUser.js");

class UserController {
	static async createNewUser(req, res, next) {
		try {
			console.log(req.body);
			res.status(201).json(req.body);
		} catch (err) {
			console.log(err);
		}
	}

	static async loginUser(req, res, next) {
		try {
			res.status(200).json(req.body);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = UserController;
