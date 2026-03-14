import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests from this IP, please try again after 15 minutes" }
});
app.use("/api", limiter);

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // default vite port
  credentials: true,
};

app.use(cors(corsOptions));

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

//order routes
app.use("/api/orders", orderRoutes);

// 404 - Route not found (when someone hits a wrong URL)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler (catches all errors from routes above)
app.use(errorHandler);

export default app;

//express.json() is required for POST/PUT

//Health route is useful for quick sanity check
