const multer = require("multer");

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 1500000 },
	fileFilter: function (req, file, cb) {
		if (!file.mimetype.includes("image")) {
			cb(null, false);
			return cb({ code: 400, msg: "File type is not an image" });
		} else {
			cb(null, true);
		}
	},
});

module.exports = { upload };
