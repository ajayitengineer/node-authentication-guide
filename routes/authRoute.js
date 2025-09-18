const authRoute = require("express").Router();
const controller = require("../controllers/authController");
const {
  signupValidation,
  signinValidation,
  tokenValidation,
} = require("../middlewares/auth");

authRoute.post("/signIn", signinValidation, controller.signIn);
authRoute.post("/signUp", signupValidation, controller.signUp);
authRoute.get("/profile", tokenValidation, controller.profile);

module.exports = authRoute;
