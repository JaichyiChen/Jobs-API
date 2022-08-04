// error handler mainly for mongoose errors
// const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  //Error for when user did not enter password or email, iterate through the err object, within the err.errors there will be a message property that we want to retrive and return
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  if (err.code && err.code === 11000) {
    // error for when user entered duplicate values
    // err object
    // index: 0,
    // code: 11000,
    // keyPattern: { email: 1 },
    // keyValue: { email: 'peter@gmail.com' },
    // [Symbol(errorLabels)]: Set(0) {}
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
