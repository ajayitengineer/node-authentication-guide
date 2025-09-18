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
  signUp: async ({ firstName, lastName, email, password, role }) => {
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
      role,
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
        const access_token = jwt.sign(
          { id: user.id, role: user.role },
          config.auth.jwtkey,
          {
            expiresIn: config.auth.expiry,
          }
        );
        const refresh_token = jwt.sign(
          { id: user.id, role: user.role },
          config.auth.refreshjwtkey,
          {
            expiresIn: config.auth.refreshExpiry,
          }
        );
        const access_token_decode = jwt.decode(access_token);
        const refresh_token_decode = jwt.decode(refresh_token);
        return {
          access_token: access_token,
          access_token_data: access_token_decode,
          refresh_token: refresh_token,
          refresh_token_data: refresh_token_decode,
        };
      }
    }
  },
  profile: async (id) => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      raw: true,
    });
  },
  admin: async () => {
    return "admin route can be access by this token";
  },
};

module.exports = authService;
