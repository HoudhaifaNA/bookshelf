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
      return res
        .setHeader(
          "Set-Cookie",
          serialize("auth_token", "", {
            httpOnly: true,
            maxAge: 5,
            path: "/",
          })
        )
        .status(200)
        .json({ message: "logout" });

    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
export default protect(handler);
