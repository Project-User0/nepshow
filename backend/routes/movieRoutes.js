import express from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  getMovieSubtitle,
  updateMovie,
  deleteMovie,
  getTrendingMovies,
  getMoviesByGenre,
  likeMovie,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  addToWatchHistory,
  getWatchHistory,
  toggleMovieStatus,
} from "../controllers/movieController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";
import { uploadMovieMedia } from "../config/multer.js";

const router = express.Router();

// Public routes
router.get("/", getAllMovies);
router.get("/trending", getTrendingMovies);
router.get("/genre/:genre", getMoviesByGenre);
router.get("/:id/subtitle", getMovieSubtitle);
router.get("/:id", getMovieById);

// User routes
router.post("/:id/like", authenticateToken, likeMovie);
router.post("/watchlist/add", authenticateToken, addToWatchlist);
router.post("/watchlist/remove", authenticateToken, removeFromWatchlist);
router.get("/watchlist/my-list", authenticateToken, getWatchlist);
router.post("/history/add", authenticateToken, addToWatchHistory);
router.get("/history/my-history", authenticateToken, getWatchHistory);

// Admin routes
router.post("/", authenticateToken, authorizeAdmin, uploadMovieMedia, createMovie);
router.put("/:id", authenticateToken, authorizeAdmin, uploadMovieMedia, updateMovie);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteMovie);
router.patch("/:id/toggle-status", authenticateToken, authorizeAdmin, toggleMovieStatus);

export default router;
