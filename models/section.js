const mongoose = require("mongoose");
const Schema = mongoose.Schema;
function validateSectionName(sectionName) {
  // const pattern = /^[a-zA-Z0-9\s]*$/;
  const pattern = /^[A-Z][a-zA-Z0-9\s]*$/;
  return pattern.test(sectionName);
}

const sectionsSchema = new Schema(
  {
    sectionName: {
      type: String,
      required: [true, "Please enter an name"],
      validate: [
        validateSectionName,
        "Section name must begin with an uppercase character and can only contain letters, numbers, and spaces",
      ],
    },
    sectionDescription: {
      type: String,
      required: [true, "Please enter an description"],
    },
    duration: {
      type: Number,
      required: [true, "Please enter a duration"],
    },
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
