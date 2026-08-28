import Review from "../models/review.js";
import { successResponse, errorResponse, isValidObjectId, paginationHelper, calculatePaginationData } from "../utils/helpers.js";

// Create a review
export const createReview = async (req, res) => {
  try {
    const { movieId, rating, title, comment } = req.body;
    const userId = req.user.userId;

    if (!isValidObjectId(movieId)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    if (!rating || !comment) {
      return errorResponse(res, 400, "Rating and comment are required");
    }

    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({ movie: movieId, user: userId });
    if (existingReview) {
      return errorResponse(res, 409, "You have already reviewed this movie");
    }

    const review = await Review.create({
      movie: movieId,
      user: userId,
      rating,
      title,
      comment,
    });

    const populatedReview = await review.populate("user", "name");

    successResponse(res, 201, "Review created successfully", populatedReview);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get all reviews for a movie
export const getMovieReviews = async (req, res) => {
  try {
    const { movieId, page, limit } = req.query;
    const { page: pageNum, limit: limitNum, skip } = paginationHelper(page, limit);

    if (!isValidObjectId(movieId)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const totalReviews = await Review.countDocuments({ movie: movieId, isApproved: true });
    const reviews = await Review.find({ movie: movieId, isApproved: true })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const paginationData = calculatePaginationData(pageNum, limitNum, totalReviews);

    successResponse(res, 200, "Movie reviews fetched successfully", {
      reviews,
      pagination: paginationData,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get all pending reviews (Admin only)
export const getPendingReviews = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { page: pageNum, limit: limitNum, skip } = paginationHelper(page, limit);

    const totalReviews = await Review.countDocuments({ isApproved: false });
    const reviews = await Review.find({ isApproved: false })
      .populate("user", "name email")
      .populate("movie", "title")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limitNum);

    const paginationData = calculatePaginationData(pageNum, limitNum, totalReviews);

    successResponse(res, 200, "Pending reviews fetched successfully", {
      reviews,
      pagination: paginationData,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Approve review (Admin only)
export const approveReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid review ID");
    }

    const review = await Review.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    ).populate("user", "name email");

    if (!review) {
      return errorResponse(res, 404, "Review not found");
    }

    successResponse(res, 200, "Review approved successfully", review);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Delete review (Admin or review owner)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid review ID");
    }

    const review = await Review.findById(id);
    if (!review) {
      return errorResponse(res, 404, "Review not found");
    }

    // Check if user is the review owner or admin
    if (review.user.toString() !== userId && req.user.role !== "admin") {
      return errorResponse(res, 403, "You are not authorized to delete this review");
    }

    await Review.findByIdAndDelete(id);

    successResponse(res, 200, "Review deleted successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Mark review as helpful/not helpful
export const updateReviewHelpfulness = async (req, res) => {
  try {
    const { id } = req.params;
    const { helpful } = req.body;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid review ID");
    }

    const review = await Review.findById(id);
    if (!review) {
      return errorResponse(res, 404, "Review not found");
    }

    if (helpful) {
      review.helpful += 1;
    } else {
      review.notHelpful += 1;
    }

    await review.save();

    successResponse(res, 200, "Review updated successfully", review);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
