import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';


export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, role } = decoded;

    // pick table based on role
    let table;

    if (role === "Tutor") table = "tutor";
    else if (role === "Student") table = "student";
    else if (role === "Admin") table = "admin";
    else return res.status(403).json({ message: "Invalid user role" });

    // Fetch user from correct table
    const [rows] = await db.query(
      `SELECT id, name, email FROM ${table} WHERE id = ?`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Account not found" });
    }

    req.user = { ...rows[0], role };

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  if (!roles.includes(req.user.role))
    return res.status(403).json({ message: `Role '${req.user.role}' not allowed` });
  next();
};
