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

const errorHandler = require("./middlewares/errorHandler");

// routes...
app.use("/api/auth", authRoutes);

// handle unknown routes
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// global error handler
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
app.get("/", (_req, res) => res.redirect("/api/auth/register"));
