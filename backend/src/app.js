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

// Security middleware
app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "https://shopscale-app.onrender.com",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 100 : 10000,
  message: {
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

app.use("/api", limiter);

// middleware
app.use(express.json());

// auth routes
app.use("/api/auth", authRoutes);

// health check route
app.get("/", (req, res) => {
  res.send("Shopscale API running");
});

// product routes
app.use("/api/products", productRoutes);

// cart routes
app.use("/api/cart", cartRoutes);

// order routes
app.use("/api/orders", orderRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// error handler
app.use(errorHandler);

export default app;
