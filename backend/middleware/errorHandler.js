function errorHandler(err, req, res, next) {
  console.error(`[${req.requestId}] ${err.stack}`);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
      requestId: req.requestId,
    });
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Invalid or expired token', requestId: req.requestId });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
    requestId: req.requestId,
  });
}

module.exports = { errorHandler };
