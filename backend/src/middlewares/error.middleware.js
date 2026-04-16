import { errorResponse } from '../utils/apiResponse.js';

const notFoundHandler = (req, res) => {
  return res.status(404).json(errorResponse('Route not found', 404));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error';
  const details = err.details || undefined;

  res.status(statusCode).json(errorResponse(message, statusCode, details));
};

export { notFoundHandler, errorHandler };
