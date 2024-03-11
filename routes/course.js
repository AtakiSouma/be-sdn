const express = require('express');
const courseController = require('../controller/courseController');
const router = express.Router();

router.route("/").get(courseController.getAllCourse);
router.route("/:id").get(courseController.getOneCourse);
router.route("/").post(courseController.createNewCourse);
router.route("/:id").delete(courseController.deleteOneCourse);
router.route("/:id").put(courseController.updateCourses);
module.exports = router;