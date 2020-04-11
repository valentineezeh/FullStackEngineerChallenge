import { success, failure } from '../lib/response_manager';
import HTTPStatus from '../constants/http_status';

/**
 * @description Employee Controller
 * @class EmployeeController
 */
class EmployeeController {
/**
     *
     * @param {*} logger Logger Object
     * @param {*} EmployeeService Object
     */
  constructor(logger, EmployeeService) {
    this.logger = logger;
    this.EmployeeService = EmployeeService;
  }

  /**
     * @description create a new employee
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns object of new employee
     */
  async createNewEmployee(req, res) {
    try {
      const {
        firstName,
        lastName,
        department,
        privilege,
        email
      } = req.body;

      const payload = {
        firstName,
        lastName,
        department,
        privilege,
        email
      }

      const data = await this.EmployeeService.createNewEmployee(payload);

      return success(res, {
        message: 'Employee created successfully.',
        response: data
      }, HTTPStatus.CREATED);
    } catch (error) {
      this.logger.error('Error creating an employee', error);
      return failure(res, {
        message: 'error creating employee',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description create a new employee review
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns of a new employee review
     */
  async createReview(req, res) {
    try {
      const {
        employeeId
      } = req.params;
      const { review } = req.body;
      const payload = {
        employeeId,
        review
      };
      const findEmployee = await this.EmployeeService.findEmployee(employeeId);

      if (!findEmployee) {
        return failure(res, {
          message: 'error finding employee',
        }, HTTPStatus.NOT_FOUND);
      }

      const data = await this.EmployeeService.createEmployeeReview(payload);

      return success(res, {
        message: 'Review creation was a success.',
        response: data
      }, HTTPStatus.CREATED);
    } catch (error) {
      this.logger.error('Error creating a review', error);
      return failure(res, {
        message: 'error creating employee',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description create a new employee
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns an array of all employees
     */
  async getAllEmployees(req, res) {
    try {
      const data = await this.EmployeeService.getAllEmployee();

      if (data.length === 0) {
        return failure(res, {
          message: 'Employee is yet to be created',
          response: []
        }, HTTPStatus.OK);
      }

      return success(res, {
        message: 'Successfully retrieve all employees',
        response: data
      })
    } catch (error) {
      this.logger.error('Error getting all employees', error);
      return failure(res, {
        message: 'error getting all employees',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export default EmployeeController;
