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
      if (user) res.status(201).json({ message: "User created" });
    } catch (err) {
      if (err instanceof Emailexist) {
        res.status(err.statuscode).json({ message: err.message });
      } else if (err instanceof Servererror) {
        res.status(err.statuscode).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  signIn: async (req, res) => {
    try {
      let user = await authService.SignIn(req.body);
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof InvalidEmail || err instanceof InvalidPassword) {
        res.status(err.statuscode).json({ message: err.message });
      } else {
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
};

module.exports = authController;
