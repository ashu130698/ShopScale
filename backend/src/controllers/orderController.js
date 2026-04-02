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

        const invalidItems = cart.items.filter((item) => item.product === null);

        if (invalidItems.length > 0) {
            cart.items = cart.items.filter((item) => item.product !== null);
            await cart.save();

            return res.status(400).json({
                message: "Some items in your cart are no longer available. Your cart has been updated.",
            });
        }

        // Validate stock for all items before proceeding
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${item.product.name}. Only ${item.product.stock} left.`
                });
            }
        }

        let totalAmount = 0;
        const orderItems = [];

        // Build order item snapshot and update stock
        for (const item of cart.items) {
            totalAmount += item.product.price * item.quantity;

            orderItems.push({
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
            });

            // Decrement stock and save the product
            item.product.stock -= item.quantity;
            await item.product.save();
        }

        // Create order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
        });

        // Clear cart after order
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        console.error("placeOrder error:", error);
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