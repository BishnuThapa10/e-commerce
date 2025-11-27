import mongoose from "mongoose";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
import Furniture from "../models/Furniture.js";



export const submitReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const furniture = id;
  const user = req.userId;
  try {
    if (!mongoose.isValidObjectId(furniture)) return res.status(400).json({ message: 'Invalid Id' });

    const order = await Order.exists({
      user: user,
      "orderItems.furniture": furniture
    });

    if (!order) {
      return res.status(403).json({ message: 'NO PURCHASE HISTORY' });
    }

    const review = await Review.exists({ user, furniture });

    if (review) {
      return res.status(403).json({ message: 'ALREADY_REVIEWED' });
    }

    await Review.create({ user, furniture, rating, comment });

    // Atomic update using aggregation pipeline
    await Furniture.findOneAndUpdate(
      { _id: furniture },
      [
        {
          $set: {
            "ratings.average": {
              $cond: [
                { $eq: ["$ratings.count", 0] },
                rating, // if no reviews yet
                {
                  $divide: [
                    { $add: [{ $multiply: ["$ratings.average", "$ratings.count"] }, rating] },
                    { $add: ["$ratings.count", 1] }
                  ]
                }
              ]
            },
            "ratings.count": { $add: ["$ratings.count", 1] }
          }
        }
      ],
      { new: true }
    );

    return res.status(201).json({ message: "REVIEWED PRODUCT SUCCESSFULLY" });
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
}

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("user", "name email").select('-status').sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
}