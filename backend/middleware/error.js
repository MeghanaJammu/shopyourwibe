const ErrorHandler = require("../utils/errorHandler");

module.exports = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  response.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
