import AppError from "./AppError";

const handleValidationErr = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const errorHandler = (err, res) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.name = err.name;
  error.message = err.message;

  if (error.name === "ValidationError") error = handleValidationErr(error);

  return res
    .status(error.statusCode)
    .json({ status: err.status, message: error.message });
};

export default errorHandler;
