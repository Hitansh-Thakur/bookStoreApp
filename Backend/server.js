
import express from "express";
import cors from "cors";
import cartRoutes from "./route/cart.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});