export const errorHandler = (error, req, res, next) => {
  console.error(`❌ Error: ${error.message}`);

  // Determinar el código de estado basado en el tipo de error
  // (esto se puede expandir con clases de error personalizadas)
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: error.message || "An unexpected error occurred",
  });
};