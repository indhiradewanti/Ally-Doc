const tokenValidity = require("../helpers/jwt.js");

const authentication = async (req, res, next) => {
	let { access_token } = req.headers;
	try {
		if (!access_token) {
			throw { code: 401, msg: "You are not logged in" };
		}
		next();
	} catch (err) {
		if (err.code) {
			next(err);
		} else {
			next({ code: 500 });
		}
	}
};

const authorizationUser = async (req, res, next) => {
	let { access_token } = req.headers;
	try {
		let { role } = tokenValidity(access_token);
		if (!role || role !== "User") {
			throw { code: 403, msg: "Unauthorized access" };
		}
		next();
	} catch (err) {
		if (err.code) {
			next(err);
		} else {
			next({ code: 500 });
		}
	}
};

const authorizationAdmin = async (req, res, next) => {
	let { access_token } = req.headers;
	try {
		let { role } = tokenValidity(access_token);
		if (!role || role !== "Admin") {
			throw { code: 403, msg: "Unauthorized access" };
		}
		next();
	} catch (err) {
		if (err.code) {
			next(err);
		} else {
			next({ code: 500 });
		}
	}
};

const authorizationDoctor = async (req, res, next) => {
	let { access_token } = req.headers;
	try {
		let { role } = tokenValidity(access_token);
		if (!role || role !== "Doctor") {
			throw { code: 403, msg: "Unauthorized access" };
		}
		next();
	} catch (err) {
		if (err.code) {
			next(err);
		} else {
			next({ code: 500 });
		}
	}
};

module.exports = {
	authentication,
	authorizationAdmin,
	authorizationDoctor,
	authorizationUser,
};
