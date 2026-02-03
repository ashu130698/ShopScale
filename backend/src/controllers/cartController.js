import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { getProductById } from "./productController";

///Get api/cart - get logged inusers logcart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
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

    //basic validation
    if (!productId) {
      return res.status(400).json({ message: "Product Id required" });
    }

    //check if porduct exist
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producct not found" });
    }

    //find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    //check product if alredy in cart
    const itemIndex = cart.items.findIndex(
      (items) => itemIndex.product.toString() === productId,
    );

    if (itemIndex > -1) {
      //product exits -> increase quantity
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      //add new item
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
      });
    }
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//PUT /api/cart - update quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity == null) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity required" });
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cartitems.find(
      (item) => item.product.toString() === productId,
    );
    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }
    item.quantity = quantity;
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete /api/cart/:productId - remove item
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
