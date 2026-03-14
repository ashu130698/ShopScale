import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import connectDB from "../../config/db.js";
import logger from "./logger.js";

dotenv.config();

const products = [
  // Electronics
  {
    name: "Aura Pro Wireless Headphones",
    description: "Premium noise-canceling headphones with 40-hour battery life and spatial audio.",
    price: 18999,
    category: "Electronics",
    stock: 50,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Zenith Smartwatch Series 5",
    description: "Elegant smartwatch with heart rate monitoring, GPS, and a stunning AMOLED display.",
    price: 12499,
    category: "Electronics",
    stock: 30,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Nebula 4K Projector",
    description: "Ultra-compact 4K projector for a true cinematic experience at home.",
    price: 45999,
    category: "Electronics",
    stock: 15,
    image: "https://images.unsplash.com/photo-1535016120720-40c646bebbbb?q=80&w=1000&auto=format&fit=crop"
  },
  
  // Lifestyle / Fashion
  {
    name: "Vantage Leather Weekender",
    description: "Handcrafted Italian leather bag designed for short trips and professional use.",
    price: 8499,
    category: "Lifestyle",
    stock: 20,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Nomad Canvas Backpack",
    description: "Durable, water-resistant canvas backpack with a dedicated 16-inch laptop sleeve.",
    price: 3299,
    category: "Lifestyle",
    stock: 100,
    image: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Heritage Minimalist Wallet",
    description: "Slim RFID-blocking wallet made from premium full-grain leather.",
    price: 1499,
    category: "Lifestyle",
    stock: 200,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop"
  },

  // Home & Office
  {
    name: "ErgoFlow Desk Chair",
    description: "Ergonomic office chair with lumbar support and breathable mesh back.",
    price: 15999,
    category: "Home & Office",
    stock: 25,
    image: "https://images.unsplash.com/photo-1505797149-43b007662973?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Lumina Smart Desk Lamp",
    description: "LED desk lamp with adjustable color temperature and integrated wireless charger.",
    price: 2499,
    category: "Home & Office",
    stock: 60,
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Titan Mechanical Keyboard",
    description: "Tactile mechanical keyboard with customizable RGB lighting and aluminum frame.",
    price: 5999,
    category: "Home & Office",
    stock: 40,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop"
  },

  // Sports & Outdoors
  {
    name: "Summit 2-Person Tent",
    description: "Lightweight, all-season tent perfect for hiking and mountain expeditions.",
    price: 7499,
    category: "Sports",
    stock: 12,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "HydroPeak Insulated Bottle",
    description: "Stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12.",
    price: 1299,
    category: "Sports",
    stock: 150,
    image: "https://images.unsplash.com/photo-1602143393494-142207b53942?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "GripMaster Yoga Mat",
    description: "Eco-friendly, non-slip yoga mat with extra cushioning for joints.",
    price: 2199,
    category: "Sports",
    stock: 80,
    image: "https://images.unsplash.com/photo-1592432676556-28156683139d?q=80&w=1000&auto=format&fit=crop"
  },

  // Kitchen & Gourmet
  {
    name: "AeroPress Coffee Maker",
    description: "Versatile and portable coffee brewer for smooth, rich coffee anywhere.",
    price: 3499,
    category: "Kitchen",
    stock: 45,
    image: "https://images.unsplash.com/photo-1544787210-2213d84ad960?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Vesta Cast Iron Skillet",
    description: "Pre-seasoned cast iron skillet with superior heat retention for perfect searing.",
    price: 2899,
    category: "Kitchen",
    stock: 35,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Culinary Precision Scale",
    description: "Digital kitchen scale with high precision sensors and a sleek glass surface.",
    price: 1199,
    category: "Kitchen",
    stock: 90,
    image: "https://images.unsplash.com/photo-1594759077573-047b96794681?q=80&w=1000&auto=format&fit=crop"
  }
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing products to avoid duplicates during seeding
    await Product.deleteMany();

    await Product.insertMany(products);

    logger.info("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    logger.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
