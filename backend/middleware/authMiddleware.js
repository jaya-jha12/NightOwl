import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //attach id and email with req.
    req.user = { id: Number(decoded.id), email: decoded.email };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};