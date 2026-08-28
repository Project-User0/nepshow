import express from "express";
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  createNotification,
} from "../controllers/notificationController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

// User routes
router.get("/", authenticateToken, getUserNotifications);
router.get("/unread-count", authenticateToken, getUnreadNotificationCount);
router.patch("/:id/read", authenticateToken, markNotificationAsRead);
router.patch("/read-all", authenticateToken, markAllAsRead);
router.delete("/:id", authenticateToken, deleteNotification);
router.delete("/delete-all", authenticateToken, deleteAllNotifications);

// Admin routes
router.post("/", authenticateToken, authorizeAdmin, createNotification);

export default router;
