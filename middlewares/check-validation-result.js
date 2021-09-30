const expressValidator = require('express-validator');

module.exports = (req, res, next) => {
  const errors = expressValidator.validationResult(req).array();

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  next();
};
