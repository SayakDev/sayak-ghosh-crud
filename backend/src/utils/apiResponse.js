export const successResponse = (message, data = null) => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message, status, details = undefined) => {
  const response = {
    success: false,
    message,
    status,
  };

  if (details) {
    response.details = details;
  }

  return response;
};
