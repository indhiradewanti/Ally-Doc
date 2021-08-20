const router = require("express").Router();
const UserController = require("../controllers/userController.js");

router.post("/create", UserController.createNewUser);
router.post("/login", UserController.loginUser);

module.exports = router;
