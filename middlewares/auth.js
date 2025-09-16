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

module.exports = { signupValidation, signinValidation };
