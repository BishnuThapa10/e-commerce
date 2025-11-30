import mongoose from "mongoose";
import Contact from "../models/Contact.js";



export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const recentCount = await Contact.countDocuments(({ email, createdAt: { $gte: fiveMinutesAgo } }));

    if (recentCount > 0) return res.status(429).json({ message: "Please wait few minutes before sending another message" });

    await Contact.create({ name, email, subject, message });
    return res.status(201).json({ message: "Your message has been sent successfully. We'll get back to you soon" })
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
}

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.find({}).lean();
    res.status(200).json(contact);
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
}

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid Id" });

    const deleteCount = await Contact.deleteOne({ _id: id });

    return res.status(deleteContact ? 200 : 404).json({
      message: deleteContact ? "Deleted successfully" : "Data not found"
    });
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
}