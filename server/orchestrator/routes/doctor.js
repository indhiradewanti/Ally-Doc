const router = require("express").Router();
const DoctorController = require("../controllers/doctorController.js");

router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);

router.post("/register", DoctorController.registerDoctor);
router.post("/login", DoctorController.loginDoctor);

router.put("/:id", DoctorController.updateDoctor);
router.patch("/:id", DoctorController.updateStatus);

router.delete("/:id", DoctorController.deleteDoctor);

module.exports = router;
