import express from 'express';
import serviceLocate from '../config/di';

const EmployeeController = serviceLocate.get('EmployeeController');
const router = express.Router();

router.post(
  '/create-employee',
  // (req, res, next) => verifyUserInput.validateRatingInput(req, res, next),
  (req, res) => EmployeeController.createNewEmployee(req, res)
);

router.post(
  '/create-employee-review/:employeeId',
  // (req, res, next) => verifyUserInput.validateRatingInput(req, res, next),
  (req, res) => EmployeeController.createReview(req, res)
);

router.get(
  '/employees',
  // (req, res, next) => verifyUserInput.validateRatingInput(req, res, next),
  (req, res) => EmployeeController.getAllEmployees(req, res)
);

export default router;
