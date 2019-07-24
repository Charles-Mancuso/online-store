const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput({ email, password }) {
    email = validText(email);
    password = validText(password);

    if (!Validator.isEmail(email)) {
        return { message: "Email is invalid", isValid: false };
    }

    if (Validator.isEmpty(email)) {
        return { message: "Email field is required", isValid: false };
    }

    if (Validator.isEmpty(password)) {
        return { message: "Password field is required", isValid: false };
    }

    return {
        message: "",
        isValid: true
    };
};
