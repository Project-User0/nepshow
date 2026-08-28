import crypto from "crypto";
import Movie from "../models/movie.js";
import { errorResponse, successResponse } from "../utils/helpers.js";

const getShareToken = (movieId) => {
  const expiresAt = Date.now() + 10 * 60 * 60 * 1000;
  const payload = `${movieId}:${expiresAt}`;
  const signature = crypto.createHmac("sha256", process.env.JWT_SECRET || "nepshow-share-secret").update(payload).digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
};

const verifyShareToken = (token) => {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [movieId, expiresAt, signature] = decoded.split(":");
    const expectedSignature = crypto
      .createHmac("sha256", process.env.JWT_SECRET || "nepshow-share-secret")
      .update(`${movieId}:${expiresAt}`)
      .digest("hex");

    if (signature !== expectedSignature) {
      return null;
    }

    return Number(expiresAt) > Date.now() ? { movieId } : null;
  } catch {
    return null;
  }
};

export const createMovieShareLink = async (req, res) => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      return errorResponse(res, 400, "Movie id is required");
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return errorResponse(res, 404, "Movie not found");
    }

    const token = getShareToken(movieId);
    const expiresAt = new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString();

    successResponse(res, 200, "Share link created successfully", {
      shareUrl: `${process.env.CLIENT_URL || "http://localhost:5173"}/shared/${movieId}?token=${token}`,
      token,
      expiresAt,
      movieId,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const getSharedMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { token } = req.query;

    if (!movieId || !token) {
      return errorResponse(res, 400, "Share token is required");
    }

    const tokenData = verifyShareToken(token);
    if (!tokenData || tokenData.movieId !== movieId) {
      return errorResponse(res, 403, "This share link is invalid or has expired");
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return errorResponse(res, 404, "Movie not found");
    }

    successResponse(res, 200, "Shared movie access granted", movie);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
