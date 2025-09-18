const jwt = require("jsonwebtoken");
const config = require("../config");
const { UnAuthorized } = require("../errors/auth");

const signupValidation = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (firstName && lastName && email && password) {
    next();
  } else {
    res
      .status(400)
      .json({ success: false, message: "All fields are required", data: [] });
  }
};

const signinValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else {
    res
      .status(400)
      .json({ success: false, message: "All fields are required", data: [] });
  }
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const jwtSecret = config.auth.jwtkey;
  try {
    const isToken = jwt.verify(token, jwtSecret);
    req.id = isToken.id;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Token expired", data: [] });
  }
};

const adminValidation = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const jwtSecret = config.auth.jwtkey;
  try {
    const isToken = jwt.verify(token, jwtSecret);
    if (isToken.role != "admin") throw new UnAuthorized();
    req.id = isToken.id;
    next();
  } catch (err) {
    res
      .status(403)
      .json({ success: false, message: "You are not Authorized", data: [] });
  }
};

module.exports = {
  signupValidation,
  signinValidation,
  tokenValidation,
  adminValidation,
};
