const jwt = require("jsonwebtoken");

const checkToken = (access_token) => {
	let validity = jwt.verify(access_token, process.env.SECRET_KEY);
	return validity;
};

module.exports = checkToken;
