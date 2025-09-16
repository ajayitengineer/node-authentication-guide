const authRoute = require("express").Router();
const controller = require("../controllers/authController");
const { signupValidation, signinValidation } = require("../middlewares/auth");

authRoute.post("/signIn", signinValidation, controller.signIn);
authRoute.post("/signUp", signupValidation, controller.signUp);

module.exports = authRoute;
