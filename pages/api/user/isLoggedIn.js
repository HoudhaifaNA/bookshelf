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
      const token = req.cookies.auth_token || req.query.token;
      if (token) {
        const decoded = await promisify(jwt.verify)(
          token,
          process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);
        if (!user)
          return res.status(404).json({ message: "User does not exist" });
        return res.status(200).json({ user });
      }
      return res.status(401).json({ message: "failed" });
    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
