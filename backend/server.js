const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.router");
// Connect to MongoDB
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});