/* eslint-disable import/no-anonymous-default-export */
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/userModel";
import errorHandler from "../../../utils/errorHandler";
import AppError from "../../../utils/AppError";

dbConnect();

const singToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, res) => {
  const token = singToken(user._id);

  return res
    .setHeader(
      "Set-Cookie",
      serialize("auth_token", token, {
        httpOnly: true,
        maxAge: 604800000,
        path: "/",
      })
    )
    .status(200)
    .json({ message: "Logged in successfully" });
};

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        // 1 - GET TOKEN FROM URL AND HASH IT AND FIND USER BY IT
        const { token } = req.query;
        const { email } = req.body;
        const hashedToken = crypto
          .createHash("sha256")
          .update(token)
          .digest("hex");

        const user = await User.findOne({
          email,
          token: hashedToken,
          tokenExpires: { $gt: Date.now() },
        });
        // 2 - IF TOKEN IS INVALID OR EXPIRED THROW ERROR
        if (!user) {
          return errorHandler(
            new AppError(
              "Token has expired or invalid or incorrect email ",
              403
            ),
            res
          );
        }

        // 3 - IF EVERYTHING WAS SUCCESSFULL REMOVE TOKEN
        user.token = undefined;
        user.tokenExpires = undefined;

        await user.save();

        return await createAndSendToken(user, res);
      } catch (err) {
        return errorHandler(new AppError(err, 403), res);
      }

    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
