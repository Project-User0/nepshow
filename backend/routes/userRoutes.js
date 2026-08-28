import express from "express";
import {
  createUserByAdmin,
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
  getUserStatistics,
  updateUserSubscription,
  getUsersWithExpiringSubscriptions,
  updateUserByAdmin,
} from "../controllers/userController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

// Admin routes
router.post("/", authenticateToken, authorizeAdmin, createUserByAdmin);
router.get("/", authenticateToken, authorizeAdmin, getAllUsers);
router.get("/stats", authenticateToken, authorizeAdmin, getUserStatistics);
router.get("/expiring-subscriptions", authenticateToken, authorizeAdmin, getUsersWithExpiringSubscriptions);
router.get("/:id", authenticateToken, authorizeAdmin, getUserById);
router.put("/:id", authenticateToken, authorizeAdmin, updateUserByAdmin);
router.put("/:id/role", authenticateToken, authorizeAdmin, updateUserRole);
router.patch("/:id/toggle-status", authenticateToken, authorizeAdmin, toggleUserStatus);
router.patch("/:id/subscription", authenticateToken, authorizeAdmin, updateUserSubscription);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteUser);

export default router;
