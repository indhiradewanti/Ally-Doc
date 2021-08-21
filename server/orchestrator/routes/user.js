const router = require("express").Router();
const UserController = require("../controllers/userController.js");
const { upload } = require("../middlewares/multer.js");

router.post(
	"/create",
	// upload.single("display_picture"),
	UserController.createNewUser
);
router.post("/login", UserController.loginUser);

router.get("/", UserController.findAllUsers);
router.get("/:id", UserController.findUserById);

router.patch(
	"/image/:id",
	upload.single("display_picture"),
	UserController.updateUserImage
);
router.patch("/:id", UserController.updateUserData);
router.patch("/payment/:id", UserController.updateUserPayment);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
