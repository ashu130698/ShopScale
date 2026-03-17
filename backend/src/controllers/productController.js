
import Product from "../models/product.js";

/// GET /api/products - list or search products
export const getProducts = async (req, res) => {
    try {
        const pageSize = 12; // Increased for better browsing
        const page = Number(req.query.page) || 1;

        // 1. Search by Keyword (Name)
        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: "i",
                  },
              }
            : {};

        // 2. Filter by Category
        const category = req.query.category ? { category: req.query.category } : {};

        // 3. Filter by Price Range
        const minPrice = Number(req.query.minPrice) || 0;
        const maxPrice = Number(req.query.maxPrice) || Infinity;
        const priceFilter = {
            price: { $gte: minPrice, $lte: maxPrice === Infinity ? 1000000 : maxPrice },
        };

        // Combine all filters
        const filters = { ...keyword, ...category, ...priceFilter };

        // 4. Sorting logic
        let sortOptions = { createdAt: -1 }; // Default: Newest first
        if (req.query.sort === "priceAsc") sortOptions = { price: 1 };
        if (req.query.sort === "priceDesc") sortOptions = { price: -1 };
        if (req.query.sort === "oldest") sortOptions = { createdAt: 1 };

        const count = await Product.countDocuments(filters);

        const products = await Product.find(filters)
            .sort(sortOptions)
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ products, page, pages: Math.ceil(count / pageSize), count });
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
        if (!name || !description || price == null || !category || !image) {
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
            return res.status(404).json({ message: "Product Not Found" });
        }

        const { name, description, price, category, stock, image } = req.body;

        // Only update allowed fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price != null ? price : product.price;
        product.category = category || product.category;
        product.stock = stock != null ? stock : product.stock;
        product.image = image || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
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