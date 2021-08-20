const multer = require("multer");

const errorHandler = (err, req, res, next) => {
	let msg;
	let code = err.code || 500;

	if (err instanceof multer.MulterError) {
		code = `400`;
		err.msg = `File size is larger than 2.5mb`;
	}

	switch (code) {
		case 400:
			msg = err.msg || `Bad request`;
			res.status(400).json({ msg });
			break;
		case 401:
			msg = err.msg || `Error authentication`;
			res.status(401).json({ msg });
			break;
		case 403:
			msg = err.msg || `Forbidden error authorization`;
			res.status(403).json({ msg });
			break;
		case 404:
			msg = err.msg || `Error not found`;
			res.status(404).json({ msg });
			break;
		case 500:
			res.status(500).json({ msg: `Internal Server Error` });
			break;
	}
};

module.exports = errorHandler;
