/* const errorHandler = (err, req, res, next) => {
const statusCode = res.statusCode ? res.statusCode: 500;
res.json({message: err.message, stackTrace: err.stack})
}



const isProduction = process.env.NODE_ENV === 'production';
const errorHandler = (err, req, res, next) => {
const statusCode = res.statusCode ? res.statusCode : 500;

const errorResponse = {
  message: err.message,
  ...(isProduction ? {} : { stackTrace: err.stack }),
};

res.status(statusCode).json(errorResponse);

}



const errorHandler =(err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
  
    const statusCode = res.statusCode ? res.statusCode : 500;
    const errorResponse = {
      message: err.message,
    };
  
    // Include stack trace only in development environment (optional)
    if (process.env.NODE_ENV !== 'production') {
      errorResponse.stackTrace = err.stack;
    }
  
    res.status(statusCode).json(errorResponse);
  }
  
 
*/
const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("No Error, All good !");
      break;
  }
};

module.exports = errorHandler;  

module.exports = errorHandler