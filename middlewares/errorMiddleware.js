const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode);
    res.json({
      error: {
        message: err.message,
      },
    });
  };
  
  module.exports = errorHandler;