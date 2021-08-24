const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
	let hashedPassword = bcrypt.hashSync(password, 8);
	return hashedPassword;
};

const checkPassword = (inputPassword, password) => {
	let checkedPassword = bcrypt.compareSync(inputPassword, password);
	return checkedPassword;
};

module.exports = { hashPassword, checkPassword };
