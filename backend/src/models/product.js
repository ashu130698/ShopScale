import mongoose from "mongoose";

const normalizeProductName = (value = "") => value.trim().toLowerCase();

///product schema for e-commerce items
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //remove extra spaces
    },

    nameLower: {
        type: String,
        required: true,
        select: false,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,  //no negative price
    },

    category: {
        type: String,
        required: true,
    },

    stock: {
        type: Number,
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

productSchema.index({ nameLower: 1 });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ createdAt: -1 });

productSchema.pre("validate", function (next) {
    if (this.name) {
        this.nameLower = normalizeProductName(this.name);
    }

    next();
});

productSchema.pre("insertMany", function (next, docs) {
    docs.forEach((doc) => {
        if (doc.name) {
            doc.nameLower = normalizeProductName(doc.name);
        }
    });

    next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
