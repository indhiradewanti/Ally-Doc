const router = require("express").Router();
const DoctorController = require("../controllers/doctorController.js");
const { upload } = require("../middlewares/multer.js");
const {
	authentication,
	authorizationDoctor,
	authorizationAdmin,
} = require("../middlewares/auth.js");

router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);

router.post(
	"/register",
	upload.single("photo"),
	authentication,
	authorizationAdmin,
	DoctorController.registerDoctor
);
router.post("/login", DoctorController.loginDoctor);

router.put(
	"/:id",
	upload.single("photo"),
	authentication,
	authorizationDoctor,
	DoctorController.updateDoctor
);
router.patch("/status/:id", DoctorController.updateStatus);
router.patch(
	"/photo/:id",
	upload.single("photo"),
	authentication,
	authorizationDoctor,
	DoctorController.updatePhoto
);

router.delete(
	"/:id",
	authentication,
	authorizationAdmin,
	DoctorController.deleteDoctor
);

module.exports = router;
