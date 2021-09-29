module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // TODO: This might cause security problems. Error info might be seen by end user. See info about what this does. https://expressjs.com/en/guide/error-handling.html
  }

  res.sendStatus(500);
};
