const authService = require("../services/authService");
const {
  Emailexist,
  Servererror,
  InvalidEmail,
  InvalidPassword,
} = require("../errors/auth");

const authController = {
  signUp: async (req, res) => {
    try {
      let user = await authService.signUp(req.body);
      if (user)
        res
          .status(201)
          .json({ success: true, message: "User created", data: [] });
    } catch (err) {
      if (err instanceof Emailexist || err instanceof Servererror) {
        res
          .status(err.statuscode)
          .json({ success: false, message: err.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }
  },
  signIn: async (req, res) => {
    try {
      let user = await authService.SignIn(req.body);
      res
        .status(200)
        .json({ success: true, message: "Log in successfully", data: [user] });
    } catch (err) {
      if (err instanceof InvalidEmail || err instanceof InvalidPassword) {
        res.status(err.statuscode).json({ message: err.message });
      } else {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  profile: async (req, res) => {
    try {
      let user = await authService.profile(req.id);
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: "error" });
    }
  },
  admin: async (req, res) => {
    try {
      let admin = await authService.admin;
      res.status(200).json({ success: true, message: admin, data: [] });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "internal server error", data: [] });
    }
  },
};

module.exports = authController;
