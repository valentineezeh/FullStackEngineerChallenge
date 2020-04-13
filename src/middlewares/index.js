import handleValidations from './errorHandlers';

const verifyUserInput = {
  validateEmployeeInput: (req, res, next) => {
    req.check('firstName', 'First Name is required.').trim().notEmpty();
    req.check('lastName', 'Last Name is optional.').trim().notEmpty();
    req.check('department', 'department is optional.').trim().notEmpty();
    req.check('privilege', 'privilege is required.').trim().optional();
    req.check('email', 'email is required.').trim().isEmail().notEmpty();
    handleValidations(req, res, next);
  },
  validateReviewInput: (req, res, next) => {
    req.check('review', 'Review is required.').trim().notEmpty();
    handleValidations(req, res, next);
  }
};

module.exports = verifyUserInput;
