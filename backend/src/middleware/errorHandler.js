export const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // Handle Neon / pg AggregateError timeouts as 503 so frontend can retry / show friendly message
  const isTimeout =
    err.code === "ETIMEDOUT" ||
    err.code === "ENETUNREACH" ||
    err.code === "ECONNREFUSED" ||
    (err.message && err.message.includes("ETIMEDOUT")) ||
    err.name === "AggregateError";

  // Extract meaningful message from AggregateError
  let message = err.message || "Internal Server Error";
  if (err.name === "AggregateError" && err.errors) {
    message = "Database connection timeout — please retry. If this persists, the database may be waking up (Neon cold start).";
  } else if (isTimeout) {
    message = "Database temporarily unavailable — please retry in a moment.";
  }

  const status = err.status || (isTimeout ? 503 : 500);

  res.status(status).json({
    message,
  });
};
