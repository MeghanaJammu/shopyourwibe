const ErrorHandler = require("../utils/errorHandler");

module.exports = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  //mongodb id error
  if (error.name === "CastError") {
    const message = `Resource not found. Invalid:${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  response.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
