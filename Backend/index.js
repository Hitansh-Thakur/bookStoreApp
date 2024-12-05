import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cartRoute from "./route/cart.route.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN, // Allow requests from frontend domain
    credentials: true, // Allow cookies to be sent with requests
  })
);

// MongoDB Connection
const URI = process.env.MongoDBURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);

export default app;
