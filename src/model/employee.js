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
  reviews: {
    type: [{
      review: {
        type: String,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      employeeId: {
        type: mongoose.SchemaTypes.ObjectId, required: true, index: true
      },
      feedback: {
        type: [{
          feedback: {
            type: String,
            trim: true
          },
          reviewId: {
            type: mongoose.SchemaTypes.ObjectId
          },
          createdAt: {
            type: Date,
            default: Date.now
          },
        }]
      }
    }]
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
