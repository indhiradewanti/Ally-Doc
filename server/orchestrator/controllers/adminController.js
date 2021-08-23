const axios = require("../helpers/axiosAdmin.js");
const Redis = require("ioredis");
const redis = new Redis();

class AdminController {
	static async registerAdmin(req, res, next) {
		try {
			let { email, password, username } = req.body;
			let registeredAdmin = await axios({
				method: "POST",
				url: `/admin/regis`,
				data: {
					email,
					password,
				},
			});
			res.status(201).json(registeredAdmin.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async loginAdmin(req, res, next) {
		try {
			let { email, password } = req.body;
			let loggedInAdmin = await axios({
				method: "POST",
				url: `/admin/login`,
				data: {
					email,
					password,
				},
			});
			res.status(200).json(loggedInAdmin.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}
}

module.exports = AdminController;
