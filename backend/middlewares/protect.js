import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]; // Extract actual token

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`); // verify checks signature
    req.userId = decoded.id;
    req.role = decoded.role
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

}

export const adminCheck = (req, res, next) => {
  if (req.role === 'admin') return next();
  return res.status(403).json({ message: "Forbidden: Admin only" });
}