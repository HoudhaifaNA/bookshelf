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
      res.setHeader(
        "Set-Cookie",
        serialize("auth_token", "", {
          maxAge: -1,
          path: "/",
        })
      );
      return res.json(200).json({});
    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
export default protect(handler);
