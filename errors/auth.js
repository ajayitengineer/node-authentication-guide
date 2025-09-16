class AuthError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    this.operational = true;
  }
}

class Emailexist extends AuthError {
  constructor() {
    super("Email is already exist", 400);
  }
}

class Servererror extends AuthError {
  constructor() {
    super("Internal server error", 500);
  }
}

class InvalidEmail extends AuthError {
  constructor() {
    super("Invalid email", 401);
  }
}

class InvalidPassword extends AuthError {
  constructor() {
    super("Invalid password", 401);
  }
}

module.exports = { Emailexist, Servererror, InvalidEmail, InvalidPassword };
