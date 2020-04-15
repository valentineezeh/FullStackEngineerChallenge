
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
     * @description login a admin
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns object of admin
     */
  async loginAdmin(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const user = await this.EmployeeService.findAdmin({ email });
      if (!user) {
        return failure(res, {
          message: 'Invalid login details'
        }, HTTPStatus.BAD_REQUEST);
      }

      const validPassword = user.validPassword(password);

      if (!validPassword) {
        return failure(res, {
          message: 'Invalid credentials'
        }, HTTPStatus.BAD_REQUEST);
      }

      const token = user.generateJWt();
      return success(res, {
        message: 'Admin login was successful',
        token,
        response: user
      });
    } catch (error) {
      this.logger.error('Error login in admin', error);
      return failure(res, {
        message: 'error login in admin',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description create a admin
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns object of admin
     */
  async registerAdmin(req, res) {
    try {
      const {
        email,
        password
      } = req.body;

      const isUserReg = await this.EmployeeService.findAdmin({ email });
      if (isUserReg) {
        return failure(res, {
          message: 'Admin already exist'
        }, HTTPStatus.CONFLICT);
      }

      const user = await this.EmployeeService.createAdmin();

      user.email = email;
      user.setPassword(password);
      await user.save();

      const token = user.generateJWt();

      return success(res, {
        message: 'Admin created successfully',
        response: user,
        token
      }, HTTPStatus.CREATED);
    } catch (error) {
      this.logger.error('Error creating Admin', error);
      return failure(res, {
        message: 'Error creating Admin',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
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
      };

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

      if (employeeId === '' || employeeId.trim().length === 0 || !employeeId) {
        return failure(res, {
          message: 'employee id is required'
        }, HTTPStatus.BAD_REQUEST);
      }
      const payload = {
        employeeId,
        review
      };
      const data = await this.EmployeeService.createEmployeeReview({ _id: employeeId }, payload);

      if (!data) {
        return failure(res, {
          message: 'error finding employee',
        }, HTTPStatus.NOT_FOUND);
      }

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
      const data = await this.EmployeeService.getAllEmployees();

      if (data.length === 0) {
        return failure(res, {
          message: 'Employee is yet to be created',
          response: []
        }, HTTPStatus.OK);
      }

      return success(res, {
        message: 'Successfully retrieve all employees',
        response: data
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error getting all employees', error);
      return failure(res, {
        message: 'error getting all employees',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description update an employee details
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns an array of all employees
     */
  async updateEmployeeDetails(req, res) {
    try {
      const { employeeId } = req.params;
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
        email,
        employeeId
      };

      if (employeeId === '' || employeeId.trim().length === 0 || !employeeId) {
        return failure(res, {
          message: 'employee id is required'
        }, HTTPStatus.BAD_REQUEST);
      }
      const data = await this.EmployeeService.updateEmployeeDetails(payload);

      if (!data) {
        return failure(res, {
          message: 'Employee not found'
        }, HTTPStatus.NOT_FOUND);
      }

      return success(res, {
        message: 'Employee update was a success',
        response: data
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error updating employee', error);
      return failure(res, {
        message: 'Error updating employee',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description delete an employee
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns an object of deleted employees
     */
  async deleteEmployeeDetails(req, res) {
    try {
      const { employeeId } = req.params;
      if (employeeId === '' || employeeId.trim().length === 0 || !employeeId) {
        return failure(res, {
          message: 'employee id is required'
        }, HTTPStatus.BAD_REQUEST);
      }

      const data = await this.EmployeeService.deleteEmployeeDetails(employeeId);

      return success(res, {
        message: 'success in deleting employee',
        response: data
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error deleting employee', error);
      return failure(res, {
        message: 'Error deleting employee',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description delete a review
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns deleted review
     */
  async deleteReview(req, res) {
    try {
      const { employeeId } = req.params;
      const { reviewId } = req.query;

      if (!employeeId || employeeId === '' || employeeId.trim().length === 0) {
        return failure(res, {
          message: 'Employee Id is required.'
        }, HTTPStatus.BAD_REQUEST);
      }

      if (!reviewId || reviewId === '' || reviewId.trim().length === 0) {
        return failure(res, {
          message: 'review Id is required.'
        }, HTTPStatus.BAD_REQUEST);
      }
      const deleteReview = await this.EmployeeService.deleteEmployeeReview({ _id: employeeId }, reviewId);

      if (!deleteReview) {
        return failure(res, {
          message: 'employee does not exist'
        }, HTTPStatus.BAD_REQUEST);
      }

      return success(res, {
        message: 'Review was successfully deleted.',
        response: deleteReview
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error deleting employee review', error);
      return failure(res, {
        message: 'Error deleting employee review',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description give employee privilege
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns employee payload
     */
  async givePrivilege(req, res) {
    try {
      const { employeeId } = req.params;
      if (!employeeId || employeeId === '' || employeeId.trim().length === 0) {
        return failure(res, {
          message: 'employee Id is required.'
        }, HTTPStatus.BAD_REQUEST);
      }
      const data = await this.EmployeeService.givePrivilege(employeeId);

      if (!data) {
        return failure(res, {
          message: 'employee not found',
        }, HTTPStatus.NOT_FOUND);
      }

      return success(res, {
        message: 'This employee has been giving the privilege to review other employee',
        response: data
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error giving this employee privilege', error);
      return failure(res, {
        message: 'Error giving this employee privilege',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description give employee review feedback
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns review feedback
     */
  async addFeedback(req, res) {
    try {
      const { employeeId } = req.params;
      const { reviewId } = req.query;
      const { feedback } = req.body;
      if (!employeeId || employeeId === '' || employeeId.trim().length === 0) {
        return failure(res, {
          message: 'employee Id is required.'
        }, HTTPStatus.BAD_REQUEST);
      }

      if (!reviewId || reviewId === '' || reviewId.trim().length === 0) {
        return failure(res, {
          message: 'review Id is required.'
        }, HTTPStatus.BAD_REQUEST);
      }

      const payload = {
        feedback,
        reviewId
      };

      const data = await this.EmployeeService.giveFeedBack({ reviewId }, payload);

      if (!data) {
        return failure(res, {
          message: 'Employee not found.'
        }, HTTPStatus.NOT_FOUND);
      }

      return success(res, {
        message: 'Feedback successfully submitted',
        response: data
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error giving review feedback', error);
      return failure(res, {
        message: 'Error giving review feedback',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
     * @description give employee review feedback
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns review feedback
     */
  async getAllReviews(req, res) {
    try {
      const { employeeId } = req.params;
      const getAllReviews = await this.EmployeeService.getReviews(employeeId);
      if (getAllReviews.length === 0) {
        return failure(res, {
          message: 'Review is yet to be created'
        }, HTTPStatus.Ok);
      }
      return success(res, {
        message: 'ALl reviews',
        response: getAllReviews
      }, HTTPStatus.OK);
    } catch (error) {
      this.logger.error('Error giving review feedback', error);
      return failure(res, {
        message: 'Error giving review feedback',
      }, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export default EmployeeController;
