import express from "express";
import { getMyOrders, getOrderById, placeOrder } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js"

const router = express.Router();

//All order routes required authentication
router.use(protect);

router.post("/", placeOrder);
router.get("/", getMyOrders);
router.get("/:id", getOrderById);

export default router;