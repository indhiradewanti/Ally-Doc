const axios = require("../helpers/axiosAdmin.js");

class AdminController {
	static async registerAdmin(req, res, next) {
		try {
			// send email, password, username
			// return admin data
		} catch (err) {
			console.log(err);
		}
	}

	static async loginAdmin(req, res, next) {
		try {
			// send email password
			// return access token and role
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = AdminController;
