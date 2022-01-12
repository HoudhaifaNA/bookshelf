import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://bookshelf:CCn3bE1Xz6HkVgul@cluster0.ripzk.mongodb.net/bookshelf?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("CONNECT SUCCESSFULLY ..."))
    .catch((err) => console.log(err));
};
export default dbConnect;
