import dotenv from "dotenv";
import connectDB from "../config/db.js";
import app from "./app.js";

dotenv.config(); //load env variables

const startServer = async () => {
  try {
    ///connect to database first
    await connectDB();

    const PORT = process.env.PORT || 4000;

    ///start server
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("Server start failed");
    process.exit(1);
  }
};

startServer();

//DB connects before server listens

//Clear startup flow
