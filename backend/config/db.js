import mongoose from "mongoose";
import logger from "../src/utils/logger.js";

// connects application to mongodb
const connectDB = async () => {
  try {
    const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

    const uri = `mongodb+srv://${DB_USER}:${encodeURIComponent(
      DB_PASSWORD,
    )}@${DB_HOST}/${DB_NAME}`;

    await mongoose.connect(uri);
    await mongoose.connection.collection("products").updateMany(
      { nameLower: { $exists: false } },
      [{ $set: { nameLower: { $toLower: "$name" } } }],
    );

    //short explanation
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1); //crash app if db fails
  }
};

export default connectDB;
