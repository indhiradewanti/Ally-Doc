const Admin = require("../Model/index");
const { hashSync, compareSync } = require("../Helper/Bcrypt");
const jwt = require("jsonwebtoken");

class ControllerAdmin {
	static async createAdmin(req, res, next) {
		try {
			let { email, password, username } = req.body;
			password = password ? hashSync(password) : password;
			const data = await Admin.create({ email, password, username });
			if (!data) {
				throw { code: 400, message: "Error Create Admin" };
			} else {
				const access_token = jwt.sign(
					{ id: data._id, username: data.username, role: data.role },
					process.env.SECRET_KEY
				);
				res.status(201).json({ access_token });
			}
		} catch (err) {
			if (err.name === "ValidationError") {
				let errorMessages = [];
				for (let key in err.errors) {
					errorMessages.push(err.errors[key].message);
				}
				next({ code: 400, message: errorMessages.join(", ") });
			}
			if (err.message === "Illegal arguments: undefined, string") {
				err.code = 400;
				err.message = "password wrong/empty";
			}
			const code = err.code || 500;
			const message = err.message;
			next({
				code,
				message,
			});
		}
	}
	static async loginAdmin(req, res, next) {
		try {
			let { email, password } = req.body;
			const find = await Admin.findOne({ email }).exec();
			if (find) {
				if (find.role === "Admin") {
					const hash = find.password;
					const bool = compareSync(password, hash);
					if (bool) {
						const access_token = jwt.sign(
							{
								id: find._id,
								username: find.username,
								role: find.role,
							},
							process.env.SECRET_KEY
						);
						res.status(200).json({ access_token });
					} else {
						throw { code: 401, message: "Data Not Found" };
					}
				} else {
					throw { code: 403, message: "Forbidden to Access" };
				}
			} else {
				throw { code: 401, message: "Email/Password is Wrong" };
			}
		} catch (err) {
			const code = err.code || 500;
			const message = err.message || "internal server error";
			next({
				code,
				message,
			});
		}
	}
}

module.exports = ControllerAdmin;