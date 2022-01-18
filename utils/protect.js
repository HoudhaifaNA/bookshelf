import { promisify } from "util";
import jwt from "jsonwebtoken";

import errorHandler from "./errorHandler";
import AppError from "./AppError";
import User from "../models/userModel";

const protect = (handler) => {
  return async (req, res) => {
    // Get token and check if it exists
    let token;

    if (req.cookies.auth_token) token = req.cookies.auth_token;

    if (!token) {
      return errorHandler(
        new AppError("Token doesn't exist or has expired", 401),
        res
      );
    }

    try {
      // Verify token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // Check if user exists with refresh token
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return errorHandler(
          new AppError(
            "The user belonging to this token no longer exist.",
            401
          ),
          res
        );
      }

      // Grant access to protected route
      req.user = currentUser;
      return handler(req, res);
    } catch (error) {
      return res.redirect("/login");
    }
  };
};
export default protect;
