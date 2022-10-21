const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const cors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const reqHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', reqHeaders);
    return res.end();
  }
  return next();
};

module.exports = cors;
