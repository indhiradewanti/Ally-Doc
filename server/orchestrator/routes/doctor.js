const router = require("express").Router();
const DoctorController = require("../controllers/doctorController.js");
const { upload } = require("../middlewares/multer.js");

router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);

router.post(
	"/register",
	upload.single("photo"),
	DoctorController.registerDoctor
);
router.post("/login", DoctorController.loginDoctor);

router.put("/:id", upload.single("photo"), DoctorController.updateDoctor);
router.patch("/status/:id", DoctorController.updateStatus);
router.patch(
	"/photo/:id",
	upload.single("photo"),
	DoctorController.updatePhoto
);

router.delete("/:id", DoctorController.deleteDoctor);

module.exports = router;
