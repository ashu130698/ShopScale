import jwt from "jsonwebtoken";

/// Generates JWT token for authenticated user
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default generateToken;
