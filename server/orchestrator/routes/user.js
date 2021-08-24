const router = require("express").Router();
const UserController = require("../controllers/userController.js");
const { upload } = require("../middlewares/multer.js");
const {
	authentication,
	authorizationUser,
	authorizationAdmin,
} = require("../middlewares/auth.js");

router.post(
	"/create",
	upload.single("display_picture"),
	UserController.createNewUser
);
router.post("/login", UserController.loginUser);
router.post("/payment", UserController.payConsultation);

router.get(
	"/",
	authentication,
	authorizationAdmin,
	UserController.findAllUsers
);
router.get(
	"/:id",
	authentication,
	authorizationUser,
	UserController.findUserById
);

router.patch(
	"/image/:id",
	upload.single("display_picture"),
	authentication,
	authorizationUser,
	UserController.updateUserImage
);
router.patch(
	"/:id",
	authentication,
	authorizationUser,
	UserController.updateUserData
);
router.patch(
	"/payment/:id",
	authentication,
	authorizationUser,
	UserController.updateUserPayment
);

router.delete(
	"/:id",
	authentication,
	authorizationUser,
	UserController.deleteUser
);

module.exports = router;
