import mongoose from "mongoose";
import { colorsEnum, sizeEnum } from "./Furniture.js";


export const countriesEnum = ["Sri Lanka", "Nepal", "India"];
export const provincesEnum = ["Western Province", "Eastern Province", "Northern Province", "Southern Province",];


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderItems: [
      {
        furniture: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Furniture",
          required: true,
        },

        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, min: 1, required: true },
        color: { type: String, enum: colorsEnum.map(c => c.name), required: true },
        size: { type: String, enum: sizeEnum, required: true },
        image: {
          url: { type: String, required: true },
          public_id: { type: String, required: true }
        },

      }
    ],

    billingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      company: { type: String },
      country: { type: String, enum: countriesEnum, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, enum: provincesEnum },
      zipCode: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
      addInfo: { type: String }
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD",
    },

    totalAmount: {
      type: Number,
      required: true
    }
  }, { timestamps: true })

const Order = mongoose.model('Order', orderSchema);
export default Order;