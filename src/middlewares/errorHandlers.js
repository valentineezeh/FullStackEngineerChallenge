const { failure } = require('../lib/response_manager');
const HTTPStatus = require('../constants/http_status');

const handleValidations = (req, res, next) => {
  const error = req.validationErrors();
  const validationErrors = [];
  if (error) {
    error.map(err => validationErrors.push(err.msg));
    return failure(res, {
      message: validationErrors
    }, HTTPStatus.BAD_REQUEST
    )
  }
  next();
};

module.exports = handleValidations;