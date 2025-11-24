// routes/adminRoutes.js
import express from "express";
import {
  getStats,
  getAllStudents,
  getAllTutors,
  getAllPosts,
  getAllApplications,
  deleteUser,
} from "../controllers/admin/dashboard.js";
import {login} from "../controllers/admin/login.js"
import { protect, authorizeRoles } from "../middlewares/userMiddleware.js"; // assume an admin auth middleware

const router = express.Router();

// protectAdmin should ensure only admin can access these endpoints
router.post("/login",login)
router.get("/stats", protect, authorizeRoles('Admin'), getStats);
router.get("/students", protect, authorizeRoles('Admin'), getAllStudents);
router.get("/tutors", protect, authorizeRoles('Admin') ,getAllTutors);
router.get("/posts", protect, authorizeRoles('Admin') ,getAllPosts);
router.get("/applications", protect, authorizeRoles('Admin') ,getAllApplications);
router.delete("/delete/:type/:id", protect, authorizeRoles('Admin') ,deleteUser);

export default router;
