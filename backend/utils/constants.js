const allowedCors = [
  'https://nastiakor.mesto.nomoredomains.icu',
  'http://nastiakor.mesto.nomoredomains.icu',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
