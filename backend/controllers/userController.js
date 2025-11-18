import User from "../models/User.js";
import jwt from 'jsonwebtoken';

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    await User.create({ name, email, password });
    return res.status(201).json({ message: "Register successfully" });
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
}



// Login user

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({ message: "Login successfully", token })
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
}

// Logout user
export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout successful"
    });
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
};
