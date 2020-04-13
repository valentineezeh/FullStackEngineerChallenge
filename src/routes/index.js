import express from 'express';
import serviceLocate from '../config/di';
import verifyUserInput from '../middlewares';

const EmployeeController = serviceLocate.get('EmployeeController');
const router = express.Router();

router.post(
  '/create-employee',
  (req, res, next) => verifyUserInput.validateEmployeeInput(req, res, next),
  (req, res) => EmployeeController.createNewEmployee(req, res)
);

router.post(
  '/create-employee-review/:employeeId',
  (req, res, next) => verifyUserInput.validateReviewInput(req, res, next),
  (req, res) => EmployeeController.createReview(req, res)
);

router.get(
  '/employees',
  (req, res) => EmployeeController.getAllEmployees(req, res)
);

router.get(
  '/employee-reviews/:employeeId',
  (req, res) => EmployeeController.getEmployeeReview(req, res)
);

router.delete(
  '/employee/:employeeId',
  (req, res) => EmployeeController.deleteEmployeeDetails(req, res)
);

router.delete(
  '/review/:reviewId',
  (req, res) => EmployeeController.deleteReview(req, res)
);

router.patch(
  '/employee-review-privilege/:employeeId',
  (req, res) => EmployeeController.givePrivilege(req, res)
);

export default router;
