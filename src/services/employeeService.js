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
      return await EmployeeModel.find().populate();
    } catch (error) {
      this.logger.error('error getting all employees');
    }
  }

  /**
     * @description create a new employee
     * @param {Object} payload - Http Request object
     * @returns {Object} returns a payload of created employee
     */
  async updateEmployeeDetails(payload) {
    try {
      const response = await EmployeeModel.findByIdAndUpdate({ _id: payload.employeeId }, payload, { new: true });
      return response;
    } catch (error) {
      this.logger.error('error getting all employees');
    }
  }

  /**
     * @description delete a employee
     * @param {Object} id - Http Request object
     * @returns {Object} returns a payload of deleted employee
     */
  async deleteEmployeeDetails(id) {
    try {
      const response = await EmployeeModel.findByIdAndDelete({ _id: id });
      return response;
    } catch (error) {
      this.logger.error('error deleting this employee');
    }
  }

  /**
     * @description delete a employee
     * @param {Object} id - Http Request object
     * @returns {Object} returns a payload of deleted employee
     */
  async getEmployeeReview(id) {
    try {
      const response = await ReviewModel.find({ employeeId: id });
      return response;
    } catch (error) {
      this.logger.error('error deleting this employee');
    }
  }

  /**
     * @description delete all reviews allocated to an employee
     * @param {Object} id - Http Request object
     * @returns {Object} returns a payload of deleted reviews
     */
  async deleteEmployeeReview(id) {
    try {
      const response = await ReviewModel.deleteMany({
        employeeId: id
      });
      return response;
    } catch (error) {
      this.logger.error('error deleting employee reviews');
    }
  }

  /**
     * @description delete all reviews
     * @param {Object} id - Http Request object
     * @returns {Object} returns a payload of deleted reviews
     */
  async deleteReview(id) {
    try {
      const response = await ReviewModel.deleteOne({
        _id: id
      });
      return response;
    } catch (error) {
      this.logger.error('error deleting reviews');
    }
  }

  /**
     * @description give employee privilege
     * @param {Object} id - Http Request object
     * @returns {Object} returns a payload of employee
     */
  async givePrivilege(id) {
    try {
      const response = await EmployeeModel.findByIdAndUpdate({ _id: id }, { privilege: true }, { new: true });
      return response;
    } catch (error) {
      this.logger.error('error giving employee privilege.');
    }
  }
}

export default EmployeeService;
