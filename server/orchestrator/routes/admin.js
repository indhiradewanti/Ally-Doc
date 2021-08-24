const router = require("express").Router();
const AdminController = require("../controllers/adminController.js");

router.post("/register", AdminController.registerAdmin);
router.post("/login", AdminController.loginAdmin);

module.exports = router;
