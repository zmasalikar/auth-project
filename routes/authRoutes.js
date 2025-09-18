const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { register, login, getUser } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");

router.get("/register", (req, res) => {
  res.send("This endpoint accepts POST requests. Use Postman or send a JSON POST to register.");
});

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("password must be at least 6 chars")
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("valid email is required"),
    body("password").notEmpty().withMessage("password is required")
  ],
  validate,
  login
);

router.get("/me", authMiddleware, getUser);

module.exports = router;
