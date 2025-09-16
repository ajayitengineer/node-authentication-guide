const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  Emailexist,
  Servererror,
  InvalidEmail,
  InvalidPassword,
} = require("../errors/auth");

const authService = {
  signUp: async ({ firstName, lastName, email, password }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Emailexist();
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    if (!user) throw new Servererror();
    return user;
  },

  SignIn: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new InvalidEmail();
    } else {
      const isPassword = await bcrypt.compare(password, user.password);
      console.log({ isPassword });
      if (!isPassword) {
        throw new InvalidPassword();
      } else {
        const token = jwt.sign({ id: user.id }, config.auth.jwtkey, {
          expiresIn: config.auth.expiry,
        });
        const refreshToken = jwt.sign(
          { id: user.id },
          config.auth.refreshExpiry,
          {
            expiresIn: config.auth.refreshExpiry,
          }
        );
        return { token: token, expiry: config.auth.expiry, refreshToken };
      }
    }
  },
};

module.exports = authService;
