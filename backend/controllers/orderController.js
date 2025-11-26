import Furniture from "../models/Furniture.js";
import Order from "../models/Order.js";
import { uploadSnapshot } from "../utils/schema/uploadOrderSnapshot.js";



export const createOrder = async (req, res) => {
  try {
    const { orderItems, billingAddress, paymentMethod } = req.body;

    if (!orderItems?.length) {
      return res.status(400).json({ message: "No order items" });
    }

    // Fetch furniture + upload snapshots in parallel
    const updateItems = await Promise.all(
      orderItems.map(async (item) => {
        const furniture = await Furniture.findById(item.furniture);

        if (!furniture) throw new Error(`Data not found: ${item.furniture}`);

        if (furniture.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${furniture.name}`);
        }

        // console.log(furniture.images[0].url);

        const snapshot = await uploadSnapshot(furniture.images[0].url, furniture._id);

        return {
          furniture: furniture._id,
          name: furniture.name,
          price: furniture.price,
          quantity: item.quantity,
          color: item.color,
          size:item.size,
          image: {
            url: snapshot.url,
            public_id: snapshot.public_id
          },
        };
      })
    );


    // Stock operations (prepare bulkWrite)
    const bulkStockOps = updateItems.map((item) => ({
      updateOne: {
        filter: {
          _id: item.furniture,
          stock: { $gte: item.quantity }, // double-check stock
        },
        update: { $inc: { stock: -item.quantity } }
      }
    }));

    // Execute all stock updates AT ONCE
    const bulkResult = await Furniture.bulkWrite(bulkStockOps, { ordered: false });

    // Check if any update failed
    const failed = bulkResult.modifiedCount !== updateItems.length;

    if (failed) {
      return res.status(400).json({
        message: "Some items are out of stock. Order cancelled.",
      });
    }

    // Calculate total price on backend
    const totalAmount = updateItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Create the order
    const order = await Order.create({
      user: req.userId,
      orderItems: updateItems,
      billingAddress,
      paymentMethod,
      totalAmount
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1});
    return res.status(200).json(orders);
  } catch (err) {
     res.status(500).json({ message: err?.message });
  }
}