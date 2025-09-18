const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email, password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.json({ message: "User registered successfully" });
  } catch (err) {
    // full diagnostic logging
    console.error("REGISTER_ERROR:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
      code: err.code,
      error: err
    });
    // return a helpful error to client
    return res.status(500).json({ error: "Registration failed: server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } catch (err) {
    console.error("LOGIN_ERROR:", err);
    return res.status(500).json({ error: "Login failed: server error" });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    return res.json({ user: req.user });
  } catch (err) {
    console.error("ME_ERROR:", err);
    return res.status(500).json({ error: "Cannot get user" });
  }
};
