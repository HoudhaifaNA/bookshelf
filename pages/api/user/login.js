/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import Email from "../../../utils/Email";
import User from "../../../models/userModel";
import errorHandler from "../../../utils/errorHandler";
import AppError from "../../../utils/AppError";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (!user) user = await User.create({ email });
        const token = await user.createAuthToken();
        await user.save({ validateBeforeSave: false });

        await new Email(
          user,
          `${req.headers.origin}/confirm/${token}`
        ).sendAuthLink();
        return res
          .status(200)
          .json({ message: "Email has been sent to your email address" });
      } catch (err) {
        return errorHandler(err, res);
      }
    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
