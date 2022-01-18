import dbConnect from "../../../utils/dbConnect";
import errorHandler from "../../../utils/errorHandler";
import AppError from "../../../utils/AppError";
import protect from "../../../utils/protect";
import User from "../../../models/userModel";

dbConnect();

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const { title, author, thumbnail, bookId, status } = req.body;
        if (status === " ") {
          return errorHandler(new AppError("Status is required", 403), res);
        }
        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            books: {
              title,
              author,
              thumbnail,
              bookId,
              status,
            },
          },
        });

        return res.status(200).json({ message: "success" });
      } catch (err) {
        return errorHandler(err, res);
      }

    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
export default protect(handler);
