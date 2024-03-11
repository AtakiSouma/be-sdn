const error = require("mongoose/lib/error");
const { response } = require("../app");
const Courses = require("../models/courses");
const Sections = require("../models/section");
const handleErrors = (err) => {
  console.log("hello ERROR:", err.message, err.code);
  let errors = {
    sectionName: "",
    sectionDescription: "",
    duration: "",
    course: "",
  };
  if (err.message?.includes("Sections validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
class SectionController {
  async getUpdateCoursePage(req, res, next) {
    const section = await Sections.findById({ _id: req.params.id }).populate(
      "course"
    );
    const course = await Courses.find({});
    return res.render("updateSection", { section: section, course: course });
  }
  F;
  async getDashboard(req, res, next) {
    const allsection = await Sections.find({}).populate("course");
    return res.render("dashboard", { section: allsection });
  }
  async getCreateCoursePage(req, res, next) {
    const allCourswe = await Courses.find({});
    return res.render("createSection", { course: allCourswe });
  }
  async deleteSection(req, res, next) {
    try {
      const { id } = req.params;
      await Sections.findByIdAndDelete(id);
      res.status(201).render("dashboard");
    } catch (err) {
      next(error);
    }
  }
  async updateSections(req, res, next) {
    const { id } = req.params;
    const { sectionName, sectionDescription, duration, isMainTask, course } =
      req.body;
    try {
      const existSection = await Sections.findByIdAndUpdate(
        { _id: id },
        {
          course: course,
          duration: duration,
          isMainTask: isMainTask,
          sectionDescription: sectionDescription,
          sectionName: sectionName,
        },
        {
          new: true,
        }
      );
      const response = {
        status: 200,
        msg: "Course created Successfully",
        existSection,
      };

      return res.status(200).json(response);
    } catch (error) {
      const errors = handleErrors(error);
      return res.status(500).json({
        errors,
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  }
  async createNewSection(req, res, next) {
    const sectionName = req.body.sectionName;
    const sectionDescription = req.body.sectionDescription;
    const duration = req.body.duration;
    const isMainTask = req.body.isMainTask ? "true" : "false";
    const course = req.body.course;

    try {
      const newSections = await Sections.create({
        course: course,
        duration: duration,
        isMainTask: isMainTask,
        sectionDescription: sectionDescription,
        sectionName: sectionName,
      });
      const response = {
        status: 200,
        msg: "Course created Successfully",
        newSections,
      };

      return res.status(200).json(response);
    } catch (error) {
      const errors = handleErrors(error);
      return res.status(500).json({
        errors,
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  }
}

module.exports = new SectionController();
