import express from "express";
import {
  createPayment,
  handlePaymentFailure,
  completePayment,
  getAllPayments,
  getPaymentById,
  getUserPayments,
  processRefund,
  getPaymentStatistics,
} from "../controllers/paymentController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

// User routes
router.post("/", authenticateToken, createPayment);
router.post("/complete", authenticateToken, completePayment);
router.post("/failure", authenticateToken, handlePaymentFailure);
router.get("/my-payments", authenticateToken, getUserPayments);

// Admin routes
router.get("/", authenticateToken, authorizeAdmin, getAllPayments);
router.get("/stats", authenticateToken, authorizeAdmin, getPaymentStatistics);
router.get("/:id", authenticateToken, authorizeAdmin, getPaymentById);
router.post("/:id/refund", authenticateToken, authorizeAdmin, processRefund);

export default router;
