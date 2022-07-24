const errorHandler = (err, req, res, next) => {
    // console.log(err);
    const statusCode = err.statusCode || 500;

    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };
