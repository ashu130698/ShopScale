import mongoose from "mongoose";
import Product from "./product.js";

//order item snapshot schema
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

//order Schema
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [orderItemSchema],
    
    totalAmount: {
        type: Number,
        required: true,
        min:0,
    },

    status: {
        type: String,
        enum: ["Placed", "CANCELLED"],
        default:"Placed",
    },
},
    {timestamps:true,}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
