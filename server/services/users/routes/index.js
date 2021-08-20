const router = require("express").Router();
const MainController = require("../controllers/mainController.js");
const { upload } = require("../middlewares/multer.js");

router.post("/", upload.single("display_picture"), MainController.createUser);
router.post("/login", MainController.loginUser);

router.get("/", MainController.findAllUsers);
router.get("/:id", MainController.findUser);

router.patch(
	"/:id",
	upload.single("display_picture"),
	MainController.updateUser
);
router.patch("/payment/:id", MainController.updateUserPayment);

router.delete("/:id", MainController.deleteUser);

module.exports = router;
