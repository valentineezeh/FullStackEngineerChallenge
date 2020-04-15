import EmployeeModel from '../model/employee';
import ReviewModel from '../model/reviews';
import UserModel from '../model/user';

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
     * @param {Object} searchQuery - Http Request object
     * @returns {Object} returns a payload of created employee
     */
  async findAdmin(searchQuery) {
    try {
      const response = await UserModel.findOne(searchQuery);
      return response;
    } catch (error) {
      this.logger.error('error login in admin');
    }
  }

  /**
     * @description create a new employee
     * @param {Object} searchQuery - Http Request object
     * @returns {Object} returns a payload of created employee
     */
  async createAdmin() {
    try {
      const response = await new UserModel();
      return response;
    } catch (error) {
      this.logger.error('error creating admin');
    }
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
     * @param {Object} searchQuery - Http Request object
     * @param {Object} payload - Http Request object
     * @returns {Object} returns a payload of created employee
     */
  async createEmployeeReview(searchQuery, payload) {
    try {
      const response = await EmployeeModel.findOneAndUpdate(
        searchQuery, {
          $push: {
            reviews: [payload]
          }
        },
        { new: true }
      );
      return response;
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
      return await EmployeeModel.find().sort({
        updatedAt: -1
      });
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
     * @description delete all reviews allocated to an employee
     * @param {Object} searchQuery - Http Request object
     * @param {Object} reviewId - Http Request object
     * @returns {Object} returns a payload of deleted reviews
     */
  async deleteEmployeeReview(searchQuery, reviewId) {
    try {
      const response = await EmployeeModel.findByIdAndUpdate(
        searchQuery,
        {
          $pull: {
            reviews: { _id: reviewId }
          }
        },
        { new: true }
      );
      return response;
    } catch (error) {
      this.logger.error('error deleting employee reviews');
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

  /**
     * @description give a review feedback
     * @param {Object} searchQuery - Http Request object
     * @param {Object} payload - Http Request object
     * @returns {Object} returns response
     */
  async giveFeedBack(searchQuery, payload) {
    try {
      const response = await EmployeeModel.updateOne(
        { 'reviews._id': { $eq: searchQuery.reviewId } },
        {
          $push: {
            'reviews.$.feedback': [payload]
          }
        },
        { new: true }
      );
      return response;
    } catch (error) {
      this.logger.error('error giving review feedback');
    }
  }

  /**
     * @description give a review feedback
     * @param {Object} employeeId - Http Request object
     * @returns {Object} returns response
     */
  async getReviews(employeeId) {
    try {
      const response = await EmployeeModel.find({ 'reviews.employeeId': employeeId }, 'reviews');
      return response;
    } catch (error) {
      this.logger.error('error getting reviews');
    }
  }
}

export default EmployeeService;
