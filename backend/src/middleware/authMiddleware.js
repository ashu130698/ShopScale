import jwt from "jsonwebtoken";
import User from "../models/user.js";

///Protect route from JWT
const protect = async (req, res, next) => {
  let token;

  //short explanation
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      ///extract token from header
      token = req.headers.authorization.split(" ")[1];

      ///verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      ///attach user to request (without password)
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not Authorized, user not found" });
      }

      return next();
    } catch (error) {
      res.status(401).json({ message: "Not Authorized, token failed" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not Authorized, no token" });
  }
};

export default protect;
