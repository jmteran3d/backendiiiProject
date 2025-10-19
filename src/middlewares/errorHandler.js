export const errorHandler = (error, req, res, next) => {
  console.error(`❌ Error: ${error.message}`);

  // Determinar el código de estado basado en el mensaje de error
  let statusCode = 500; // Por defecto, es un error interno

  if (error.message.includes("Validation Error")) {
    statusCode = 400; // Bad Request
  }

  if (error.message.includes("Not Found")) {
    statusCode = 404; // Not Found
  }

  res.status(statusCode).json({
    status: "error",
    message: error.message || "An unexpected error occurred",
  });
};