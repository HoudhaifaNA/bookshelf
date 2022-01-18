import dbConnect from "../../../utils/dbConnect";
import errorHandler from "../../../utils/errorHandler";
import AppError from "../../../utils/AppError";
import protect from "../../../utils/protect";
import User from "../../../models/userModel";

dbConnect();

const handler = async (req, res) => {
  let { id } = req.query;

  switch (req.method) {
    case "PATCH":
      try {
        const { status } = req.body;
        await User.updateOne(
          { _id: req.user._id, "books.bookId": id },
          {
            $set: {
              "books.$.status": status,
            },
          }
        );

        return res.status(200).json({ message: "success" });
      } catch (err) {
        return errorHandler(err, res);
      }
    case "DELETE":
      try {
        await User.findByIdAndUpdate(req.user._id, {
          $pull: {
            books: {
              bookId: id,
            },
          },
        });

        return res.status(204).json();
      } catch (err) {
        return errorHandler(err, res);
      }
    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
export default protect(handler);
