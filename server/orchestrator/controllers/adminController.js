const axios = require("../helpers/axiosAdmin.js");
// /admin
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
					username,
				},
			});
			console.log(registeredAdmin);
			// return admin data
		} catch (err) {
			console.log(err);
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
			// return access token and role
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = AdminController;
