import EmployeeModel from '../model/employee';
import ReviewModel from '../model/reviews';

/**
 * @description Employee service
 * @class EmployeeService
 */
class EmployeeService {
  /**
     *
     * @param {*} logger Logger Object
     * @param {*} EmployeeService Object
     */
  constructor(logger) {
    this.logger = logger;
  }


  /**
     * @description create a new employee
     * @param {Object} payload - Http Request object
     * @returns {Object} returns a payload of created employee
     */
  async createNewEmployee(payload) {
    try {
      return await EmployeeModel.create(payload);
    } catch (error) {
      this.logger.error('error creating employee');
    }
  }

  /**
     * @description create a new employee
     * @param {Object} payload - Http Request object
     * @returns {Object} returns a payload of created employee
     */
  async createEmployeeReview(payload) {
    try {
      return await ReviewModel.create(payload);
    } catch (error) {
      this.logger.error('error creating employee review');
    }
  }

  /**
     * @description create a new employee
     * @param {Object} employeeId - Http Request object
     * @returns {Object} returns a payload of created employee
     */
  async findEmployee(employeeId) {
    try {
      const response = await EmployeeModel.findOne({ _id: employeeId });
      return response;
    } catch (error) {
      this.logger.error('error creating employee review');
    }
  }

  /**
     * @description create a new employee
     * @returns {Object} returns a payload of created employee
     */
  async getAllEmployees() {
    try {
      return await EmployeeModel.find();
    } catch (error) {
      this.logger.error('error getting all employees');
    }
  }
}

export default EmployeeService;
