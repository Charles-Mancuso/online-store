const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput({ name, email, password }) {
  name = validText(name)
  email = validText(email);
  password = validText(password);

  if (!Validator.isLength(name, 2, 30)) {
    return {
      message: "Your name should be between 2 and 30 characters!",
      isValid: false
    }
  }

  if (Validator.isEmpty(name)) {
    return { message: "Name field is required", isValid: false };
  }

  if (!Validator.isEmail(email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(email)) {
    return { message: "Email field is required", isValid: false };
  }

  if (!Validator.isLength(password, 6, 30)) {
    return {
      message: "Your password should be between 6 and 30 characters!",
      isValid: false
    }
  }

  if (Validator.isEmpty(password)) {
    return { message: "Password field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};
