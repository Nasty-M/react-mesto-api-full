const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    next(new NotAuthError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, 'my-secret-code');
  } catch (err) {
    next(new NotAuthError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = { auth };
