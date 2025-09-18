const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/register", (req, res) => {
  res.send("This endpoint accepts POST requests. Use Postman or send a JSON POST to register.");
});
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getUser);

module.exports = router;
