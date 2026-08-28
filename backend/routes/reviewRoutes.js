import express from "express";
import {
  createReview,
  getMovieReviews,
  getPendingReviews,
  approveReview,
  deleteReview,
  updateReviewHelpfulness,
} from "../controllers/reviewController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

// User routes
router.post("/", authenticateToken, createReview);
router.get("/movie/:movieId", getMovieReviews);
router.patch("/:id/helpful", authenticateToken, updateReviewHelpfulness);
router.delete("/:id", authenticateToken, deleteReview);

// Admin routes
router.get("/pending", authenticateToken, authorizeAdmin, getPendingReviews);
router.patch("/:id/approve", authenticateToken, authorizeAdmin, approveReview);

export default router;
