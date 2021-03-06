const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const keys = require("../../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const ERRORS = {
  userNoExist: () => new Error("User doesn't exist!"),
  wrongPassword: () => new Errors("YOU'RE WRONG AND I'M TELLING EVERYBODY (invalid password)")
};

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);
    if (!isValid) throw new Error(message);

    const { name, email, password } = data;
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new Error("This user already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
      {
        name: name,
        email: email,
        password: hashedPassword
      },
      err => { if (err) throw err; }
    );

    user.save();
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    return { 
      token, 
      loggedIn: true,
      ...user._doc,
      password: null
     };
  } catch (err) { throw err }
};

const logout = async data =>  {
  try {
    const user = await User.findById(data._id);
    if (!user) throw ERRORS.userNoExist;
    return {
      token: "",
      loggedIn: false,
      ...user._doc,
      password: null
    };
  } catch (err) { throw err }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);
    if (!isValid) throw new Error(message);

    const { email, password } = data;

    const user = await User.findOne({ email: email });
    if (!user) throw ERRORS.userNoExist;

    const isPassword = await bcrypt.compareSync(password, user.password);
    if (!isPassword) throw ERRORS.wrongPassword;

    const token = jwt.sign({ id: user.id }, keys.secretOrKey);

    return {
      token: token,
      loggedIn: true,
      ...user._doc,
      password: null
    }
  } catch (err) { throw err }
};

const verifyUser = async data => {
  try {

    const { token } = data;

    const { id } = jwt.verify(token, keys.secretOrKey);

    const loggedIn = await User
      .findById(id)
      .then(user => (user ? true : false));

    return { loggedIn };
  } catch (err) { return { loggedIn: false } }
};

module.exports = { register, logout, login, verifyUser };

