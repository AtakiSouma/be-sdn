const jwt = require("jsonwebtoken");
const Members = require("../models/members");
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "net ninja secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/users/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/users/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await Members.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
// check if authorization
const verifyToken = async (req, res, next) => {
  let token;
  // if check if token exist in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from Bearer in header
    try {
      token = req.headers.authorization.split(" ")[1];
      // verify token and get user id
      const decoded = jwt.verify(token, "net ninja secret");
      // find user in DB from decoded token
      req.user = await Members.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        errorCode: -2,
        message: "Not authorized  , token failed",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      errorCode: -2,
      message: "Not authorized  , token failed",
    });
  }
};

module.exports = { requireAuth, checkUser, verifyToken };
