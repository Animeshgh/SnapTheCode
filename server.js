import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import snippetRoutes from "./routes/snippetRoutes.js";

dotenv.config();
const app = express();







// CORS for frontend
app.use(
  cors({
    origin: "https://snap-the-code-frontend.vercel.app",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Database Connections
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);
app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
console.log("JWT_SECRET:", process.env.JWT_SECRET)
