import Cart from "../models/cart.js"
import { getProductById } from "./productController";

///Get api/cart - get logged inusers logcart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
        if (!cart) {
            return res.json({ items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//POST /api/cart - add product to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
    } catch (error) {
        
    }
}