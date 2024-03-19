const express = require("express");
const sectionController = require("../controller/sectionController");
const { requireAuth, verifyToken } = require("../middleware/authMiddleware");
const { verify } = require("jsonwebtoken");
const router = express.Router();

router.route("/create").get(requireAuth, sectionController.getCreateCoursePage);
router.route("/create").post(requireAuth, sectionController.createNewSection);
router.route("/dashboard").get(requireAuth, sectionController.getDashboard);
router.route("/:id" ).delete(requireAuth , sectionController.deleteSection);
router.route("/update/:id").get(requireAuth,sectionController.getUpdateCoursePage);
router.route("/update/:id").put(requireAuth,sectionController.updateSections)
module.exports = router;
 