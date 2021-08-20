const router = require("express").Router();
const MainController = require("../controllers/mainController.js");
const { upload } = require("../middlewares/multer.js");
const {
	authentication,
	authorizationUser,
	authorizationAdmin,
} = require("../middlewares/auth.js");

router.post("/", upload.single("display_picture"), MainController.createUser);
router.post("/login", MainController.loginUser);

router.get(
	"/",
	authentication,
	authorizationAdmin,
	MainController.findAllUsers
);
router.get("/:id", authentication, authorizationUser, MainController.findUser);

router.patch(
	"/image/:id",
	upload.single("display_picture"),
	authentication,
	authorizationUser,
	MainController.updateUserImage
);
router.patch(
	"/:id",
	authentication,
	authorizationUser,
	MainController.updateUser
);
router.patch(
	"/payment/:id",
	authentication,
	authorizationUser,
	MainController.updateUserPayment
);

router.delete(
	"/:id",
	authentication,
	authorizationUser,
	MainController.deleteUser
);

module.exports = router;
