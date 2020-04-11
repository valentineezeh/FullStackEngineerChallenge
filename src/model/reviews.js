import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
    trim: true
  },
  employeeId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'employees',
    required: true,
    index: true
  }
}, {
  timestamps: true
});

const ReviewModel = mongoose.model('reviews', reviewSchema);

export default ReviewModel;
