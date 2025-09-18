const jwt = require("jsonwebtoken");
const config = require("../config");

const signupValidation = (req, res, next) => {
  console.log("middle ware");
  const { firstName, lastName, email, password } = req.body;
  if (firstName && lastName && email && password) {
    next();
  } else {
    res.status(400).json({ error: "All fields are required" });
  }
};

const signinValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else {
    res.status(400).json({ error: "All fields are required" });
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
    res.status(401).json({ message: "token expired" });
  }
};

module.exports = { signupValidation, signinValidation, tokenValidation };
