import express from "express";
import { addToCart, getCart, removeFromCart, updateCartItem } from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

//All carts routes are protected
router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.put("/", updateCartItem);
router.delete("/:productId", removeFromCart);

export default router;