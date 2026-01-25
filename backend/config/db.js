import mongoose from "mongoose";

// connects application to mongodb
const connectDB = async () => {
  try {
    const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

    const uri = `mongodb+srv://${DB_USER}:${encodeURIComponent(
      DB_PASSWORD,
    )}@${DB_HOST}/${DB_NAME}`;

    await mongoose.connect(uri);

    //short explanation
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1); //crash app if db fails
  }
};

export default connectDB;
