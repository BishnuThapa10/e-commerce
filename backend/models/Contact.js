import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },

  subject: {
    type: String,
  },

  message: {
    type: String,
    trim: true,
    required: true
  }
}, { timestamps: true });

contactSchema.index({ email: 1, createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;