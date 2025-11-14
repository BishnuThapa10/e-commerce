import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    console.log("Database connected sucessfully!");

  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); //Exit if DB connection fails
  }
};