const Courses = require("../models/courses");

class CourseController {
  async createNewCourse(req, res, next) {
    try {
      const { courseName, courseDescription } = req.body;

      if (!courseName || !courseDescription) {
        return res.status(404).json({
          msg: "Invalid Input",
        });
      }
      const existCourses = await Courses.findOne({
        courseName: courseName,
      });

      // check if exists
      if (existCourses) {
        return res.status(200).json({
          msg: "Courses already exists",
        });
      }
      const newCourses = await Courses.create({
        courseName: courseName,
        courseDescription: courseDescription,
      });
      const response = {
        status: 200,
        msg: "Course created Successfully",
        newCourses,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async updateCourses(req, res, next) {
    try {
      const { id } = req.params;
      const { courseName, courseDescription } = req.body;
      const UpdateCourse = await Courses.findById(id);
      if (!UpdateCourse) {
        res.status(404).json({
          status: 404,
          msg: "Category not found",
        });
      } else {
        UpdateCourse.courseName = courseName || UpdateCourse.courseName;
        UpdateCourse.courseDescription =
          courseDescription || UpdateCourse.courseDescription;
        await UpdateCourse.save();
        const response = {
          status: 200,
          msg: "Courses updated Successfully",
          UpdateCourse,
        };
        return res.status(200).json(response);
      }
    } catch (error) {
      return res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  }
  async getAllCourse(req, res, next) {
    try {
      const allCourse = await Courses.find({});
      const response = {
        status: 200,
        msg: " Fetch all Course  Successfully",
        allCourse,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  }
  async getOneCourse(req, res, next) {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        msg: "Invalid Course",
      });
    }
    try {
      const OneCourse = await Courses.findById(id);
      const response = {
        status: 200,
        msg: "Fetch one ourse  Successfully",
        OneCourse,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  }
  async deleteOneCourse(req, res, next) {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        msg: "Invalid Course",
      });
    }
    try {
      await Courses.findByIdAndDelete(id);
      const response = {
        status: 200,
        msg: "Delete one Course  Successfully",
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  }
}

module.exports = new CourseController();
