const jwt = require("jsonwebtoken");

const jwtSign = (id, email, role) => {
	const access_token = jwt.sign({ id, email, role }, process.env.SECRET_KEY);
	return access_token;
};

const jwtVerify = (access_token) => {
	let verified = jwt.verify(access_token, process.env.SECRET_KEY);
	return verified;
};

module.exports = { jwtSign, jwtVerify };
