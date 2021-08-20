const router = require("express").Router();
const adminRouter = require("./admin.js");
const doctorRouter = require("./doctor.js");
const userRouter = require("./user.js");

router.use("/admin", adminRouter);
router.use("/doctor", doctorRouter);
router.use("/user", userRouter);

module.exports = router;
