import mongoose from "mongoose";
import { type } from "os";

///product schema for e-commerce items
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //remove extra spaces
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
        min: 0,  //no negative price
    },

    category: {
        type: String,
        required: true,
    },

    stock: {
        type: String,
        required: true,
        min: 0,
        default: 0,
        
    },

    image: {
        type: String,  //base url
        required: true,
    },
},
    {
        timestamps: true,
        
    }

);

const Product = mongoose.model("Product", productSchema);

export default Product;