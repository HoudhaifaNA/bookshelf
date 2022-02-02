/* eslint-disable import/no-anonymous-default-export */
import jwt from "jsonwebtoken";
import { promisify } from "util";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/userModel";
import errorHandler from "../../../utils/errorHandler";
import AppError from "../../../utils/AppError";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      console.log(req.query.token);

      if (req.cookies.auth_token || req.query.token) {
        try {
          let token = req.cookies.auth_token || req.query.token;
          // 1) verify token
          const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
          );

          // 2) Check if user still exists
          const currentUser = await User.findById(decoded.id);
          if (!currentUser) {
            return res.status(200).json({ message: "User doesn't exist" });
          }

          return res.status(200).json({ message: "logged in", currentUser });
        } catch (err) {
          return res.status(200).json({ message: "not logged in" });
        }
      }
      return res.status(200).json({ message: "not logged in" });
    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
