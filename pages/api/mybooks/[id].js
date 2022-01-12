import dbConnect from "../../../utils/dbConnect";
import errorHandler from "../../../utils/errorHandler";
import AppError from "../../../utils/AppError";
import protect from "../../../utils/protect";
import User from "../../../models/userModel";

dbConnect();

const handler = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      try {
        const { id } = req.query;
        await User.findByIdAndUpdate(req.user._id, {
          $pull: {
            books: {
              _id: id,
            },
          },
        });

        return res.status(204).json({ message: "success" });
      } catch (err) {
        return errorHandler(err, res);
      }
    default:
      return errorHandler(new AppError("Endpoint does not exist", 404), res);
  }
};
export default protect(handler);
