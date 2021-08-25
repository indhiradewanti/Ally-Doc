const router = require("express").Router();
const HistoryController = require("../controllers/historyController.js");
const {
	authentication,
	authorizationUser,
	authorizationDoctor,
} = require("../middlewares/auth.js");

router.post("/", HistoryController.postHistory);
router.use(authentication);
router.get("/", authorizationDoctor, HistoryController.getHistory);
router.patch("/:id", authorizationDoctor, HistoryController.patchStatusHistory);

module.exports = router;
