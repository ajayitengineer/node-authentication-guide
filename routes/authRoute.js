const authRoute = require("express").Router();
const controller = require("../controllers/authController");
const {
  signupValidation,
  signinValidation,
  tokenValidation,
  adminValidation,
} = require("../middlewares/auth");

authRoute.post("/signIn", signinValidation, controller.signIn);
authRoute.post("/signUp", signupValidation, controller.signUp);
authRoute.get("/profile", tokenValidation, controller.profile);
authRoute.get("/admin", [tokenValidation, adminValidation], controller.admin);

module.exports = authRoute;
