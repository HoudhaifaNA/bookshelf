import mongoose from "mongoose";

const dbConnect = () => {
  const DB = process.env.DATABASE.replace("PASSWORD", process.env.DB_PASSWORD);
  mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("CONNECT SUCCESSFULLY ..."))
    .catch((err) => console.log(err));
};
export default dbConnect;
