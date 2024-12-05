import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cartRoute from "./route/cart.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);

export default app;
