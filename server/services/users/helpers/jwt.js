const jwt = require("jsonwebtoken");

const jwtSign = (id, email, role) => {
	const access_token = jwt.sign({ id, email, role }, process.env.SECRET_KEY);
	return access_token;
};

module.exports = { jwtSign };
