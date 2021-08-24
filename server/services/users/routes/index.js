const router = require("express").Router();
const MainController = require("../controllers/mainController.js");
const {
	authentication,
	authorizationUser,
	authorizationAdmin,
} = require("../middlewares/auth.js");

router.post("/", MainController.createUser);
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
