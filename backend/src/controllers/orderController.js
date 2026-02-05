import Cart from "../models/cart.js"
import Order from "../models/order.js";

// POST /api/order - place  order
export const placeOrder = async (req, res) => {
    try {
        //fetch users cart
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product"
        );

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let totalAmount = 0;

        //build order item snapshot
        const orderItems = cart.items.map((item) => {
            totalAmount += item.product.price * item.quantity;

            return {
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
            };
        });
        //create order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
        });
        //clear cart after ordr
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get /api/order - logged-in user only
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get api/order/:id - get single order(owner only)
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        //ensure order belong to user
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Acces Denied" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};