
import Product from "../models/product.js";

/// GET /api/products - list or search products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i", // case-insensitive
          },
        }
      : {};

    const products = await Product.find(keyword);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///GET /api/product - Public - single product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

///POST /api/product -  Admin only - createProduct
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;

        //basic validation
        if (!name || !description || !price == null || !category || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
///PUT /api/products/:id - Admin only - update product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(505).json({ message: "Product Not Found" });
        }

        ///update only provided shields
        Object.assign(product, req.body);

        const updateProduct = await product.save();
        res.json(updateProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

///Delete /api/products/:id - Admin only - delete product
export const deleteProduct = async (req, res) => {
       try {
           const product = await Product.findById(req.params.id);

           if (!product) {
               return res.status(404).json({ message: "Product not found" });
           }

           await product.deleteOne();
           res.json({ message: "Product removed" });
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
}