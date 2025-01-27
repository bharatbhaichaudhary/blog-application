const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const solt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, solt);

    const user = await User.create({
      username,
      password: hashPassword,
      email,
    });

    user.save();

    res.status(200).json({ succes: true, message: "registration successful" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ success: false, message: "User does not exist " });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRT);
   
      return res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = { register, login };
