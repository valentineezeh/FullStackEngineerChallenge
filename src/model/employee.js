import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  privilege: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const EmployeeModel = mongoose.model('employees', employeeSchema);

export default EmployeeModel;
