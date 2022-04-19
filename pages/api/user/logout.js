/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie";

import dbConnect from "../../../utils/dbConnect";
import errorHandler from "../../../utils/errorHandler";
import AppError from "../../../utils/AppError";
import protect from "../../../utils/protect";

dbConnect();

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      console.log("OH WOW---------");
      const cookieOptions = {
        maxAge: 0,
        httpOnly: true,
        path: "/",
      };

      return res
        .setHeader("Set-Cookie", serialize("auth_token", "", cookieOptions))
        .status(200)
        .json({ status: "success" });
    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
export default protect(handler);
