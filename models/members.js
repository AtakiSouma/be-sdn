const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const membersSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "Please enter an username"],
      unique: [true, "User Name is Exist"],
      minlength: [6, "Minimum username length is 6 characters"],
    },
    password: {
      type: String,
      required: [true, "Please enter an password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
  },
  { timestamps: true }
);

// fire a function before doc saved to db
membersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
membersSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};
const Members = mongoose.model("Members", membersSchema);

module.exports = Members;
