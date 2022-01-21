import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  bookId: {
    type: String,
    unique: [true, "Book id must be unique"],
  },
  status: {
    type: String,
    enum: {
      values: ["To read", "Reading", "Have read"],
      message: "Status is required.",
    },
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail],
      required: [true, "Please, provide your email"],
    },
    token: {
      type: String,
      select: false,
    },
    tokenExpires: {
      type: Date,
      select: false,
    },
    books: [bookSchema],
  },
  { timestamps: true }
);

userSchema.methods.createAuthToken = function () {
  const authToken = crypto.randomBytes(32).toString("hex");
  this.token = crypto.createHash("sha256").update(authToken).digest("hex");
  this.tokenExpires = Date.now() + 10 * 60 * 1000;

  return authToken;
};
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
