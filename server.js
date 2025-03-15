const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();

const app = express();

console.log("Auth Routes:", authRoutes);
console.log("Task Routes:", taskRoutes);


app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for frontend communication

// Debugging: Check if routes are correctly imported
console.log("Auth Routes:", authRoutes);
console.log("Task Routes:", taskRoutes);

// Use API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
