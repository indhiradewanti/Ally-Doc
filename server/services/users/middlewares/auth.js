const { jwtVerify } = require("../helpers/jwt.js");

const authentication = async (req, res, next) => {
	let { access_token } = req.headers;
	try {
		if (!access_token) {
			throw { code: 401, msg: `You are not logged in` };
		}
		next();
	} catch (err) {
		/* istanbul ignore else  */
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
		let accessTokenData = jwtVerify(access_token);
		let { role } = accessTokenData;
		if (role !== "User") {
			throw {
				code: 403,
				msg: `Unauthorized access`,
			};
		}
		next();
	} catch (err) {
		/* istanbul ignore else  */
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
		let accessTokenData = jwtVerify(access_token);
		let { role } = accessTokenData;
		if (role !== "Admin") {
			throw {
				code: 403,
				msg: `Unauthorized access`,
			};
		}
		next();
	} catch (err) {
		/* istanbul ignore else  */
		if (err.code) {
			next(err);
		} else {
			next({ code: 500 });
		}
	}
};

module.exports = {
	authentication,
	authorizationUser,
	authorizationAdmin,
};