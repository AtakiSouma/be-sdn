const Members = require("../models/members");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log("hello ERROR:",err.message, err.code);
  let errors = { username: "", password: "" };
  // incorrect username
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
  }
  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }
  // duplicate username error
  if (err.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }
  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Members.create({ username, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Members.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id ,token :token});
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/users/login");
};
module.exports.signup_get = (req, res) => {
    res.render('signup.ejs');
  }
  
  module.exports.login_get = (req, res) => {
    res.render('login.ejs');
  }