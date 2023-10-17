const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

sendErrorForDev = (err, res) => {
  return res.status(err.statusCode || 500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

sendErrorForProd = (err, res) => {
  return res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalError;
