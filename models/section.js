const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sectionsSchema = new Schema(
  {
    sectionName: { type: String, required: [true, "Please enter an name"] },
    sectionDescription: {
      type: String,
      required: [true, "Please enter an description"],
    },
    duration: { type: Number, required: [true, "Please enter a duration"] },
    isMainTask: { type: Boolean, default: false },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
      required: [true, "Please enter a course"],
    },
  },
  { timestamps: true }
);
const Sections = mongoose.model("Sections", sectionsSchema);
module.exports = Sections;
