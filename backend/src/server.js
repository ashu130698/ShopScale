import dotenv from "dotenv";
import connectDB from "../config/db.js";
import app from "./app.js";
import logger from "./utils/logger.js";

dotenv.config(); //load env variables

const startServer = async () => {
  try {
    ///connect to database first
    await connectDB();

    const PORT = process.env.PORT || 4000;

    ///start server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Server start failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();

//DB connects before server listens

//Clear startup flow
