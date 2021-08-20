const router = require("express").Router();
const UserController = require("../controllers/userController.js");

router.post("/create", UserController.createNewUser);
router.post("/login", UserController.loginUser);

router.get("/", UserController.findAllUsers);
router.get("/:id", UserController.findUserById);

router.patch("/:id", UserController.updateUserData);
router.patch("/payment/:id", UserController.updateUserPayment);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
