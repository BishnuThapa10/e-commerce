import mongoose from "mongoose";



const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    furniture: { type: mongoose.Schema.Types.ObjectId, ref: "Furniture", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true, default: null },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    }
  }, { timestamps: true });

reviewSchema.index({ user: 1, furniture: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;