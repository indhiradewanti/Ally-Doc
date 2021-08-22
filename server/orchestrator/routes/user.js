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

router.get(
	"/",
	authentication,
	authorizationAdmin,
	UserController.findAllUsers
);
router.get("/:id", authorizationUser, UserController.findUserById);

router.patch(
	"/image/:id",
	upload.single("display_picture"),
	authentication,
	authorizationUser,
	UserController.updateUserImage
);
router.patch("/:id", authorizationUser, UserController.updateUserData);
router.patch(
	"/payment/:id",
	authorizationUser,
	UserController.updateUserPayment
);

router.delete("/:id", authorizationUser, UserController.deleteUser);

module.exports = router;
