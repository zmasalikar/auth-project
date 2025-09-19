const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send(`
    <h1>Auth API</h1>
    <p>API base: <code>/api/auth</code></p>
    <h2>Endpoints</h2>
    <ul>
      <li>POST /api/auth/register — Register a new user</li>
      <li>POST /api/auth/login — Login and get a token</li>
      <li>GET /api/auth/me — Get user info (requires Bearer token)</li>
    </ul>
    <p>Use <a href="https://www.postman.com/" target="_blank">Postman</a> to test these endpoints.</p>
  `);
});

app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
