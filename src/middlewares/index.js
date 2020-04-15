import handleValidations from './errorHandlers';

const verifyUserInput = {
  validateEmployeeInput: (req, res, next) => {
    req.check('firstName', 'First Name is required.').trim().notEmpty();
    req.check('lastName', 'Last Name is required').trim().notEmpty();
    req.check('department', 'department is required').trim().notEmpty();
    req.check('privilege', 'privilege is optional.').trim().optional();
    req.check('email', 'email is required.').trim().isEmail().notEmpty();
    handleValidations(req, res, next);
  },
  validateReviewInput: (req, res, next) => {
    req.check('review', 'Review is required.').trim().notEmpty();
    req.check('feedback', 'Feedback is required.').trim().optional();
    handleValidations(req, res, next);
  },
  validateAuthInput: (req, res, next) => {
    req.check('email', 'email is required').trim().isEmail().notEmpty();
    req.check('password', 'Last Name is required.').trim().notEmpty();
    handleValidations(req, res, next);
  }
};

module.exports = verifyUserInput;
