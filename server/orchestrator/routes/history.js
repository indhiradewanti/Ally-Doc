const router = require("express").Router();
const HistoryController = require("../controllers/historyController.js");
const {
	authentication,
	authorizationUser,
	authorizationDoctor,
} = require("../middlewares/auth.js");

router.use(authentication);
router.get("/", authorizationDoctor, HistoryController.getHistory);
router.post("/", authorizationUser, HistoryController.postHistory);
router.patch("/:id", authorizationDoctor, HistoryController.patchStatusHistory);

module.exports = router;
