import express from "express";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"

const app = express();

//middleware
app.use(express.json()); //parse json request body

//auth routes
app.use("/api/auth", authRoutes);

//Health check route
app.get("/", (req, res) => {
  res.send("Shopscale API running");
});

//Product Routes
app.use("/api/products", productRoutes);

//cart routes
app.use("/api/cart", cartRoutes);

export default app;

//express.json() is required for POST/PUT

//Health route is useful for quick sanity check
