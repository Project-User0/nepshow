import Movie from "../models/movie.js";
import User from "../models/user.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  paginationHelper,
  calculatePaginationData,
  successResponse,
  errorResponse,
  isValidObjectId,
} from "../utils/helpers.js";

const parseArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

// Create a new movie (Admin only)
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      duration,
      rating,
      language,
      airedDate,
      status,
      quality,
      contentType,
      ageRating,
      director,
      cast,
      releaseYear,
      tags,
      subtitleEntries,
    } = req.body;

    if (
      !title ||
      !description ||
      !genre ||
      !language ||
      !duration ||
      !airedDate
    ) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const parsedCast = parseArrayField(cast);
    const parsedTags = parseArrayField(tags);
    const parsedSubtitleEntries = Array.isArray(subtitleEntries)
      ? subtitleEntries
      : parseArrayField(subtitleEntries);

    // Check if movie already exists
    const movieExists = await Movie.findOne({ title });
    if (movieExists) {
      return errorResponse(res, 409, "Movie already exists");
    }

    const uploadedSubtitleFiles =
      req.files?.subtitleFiles || req.files?.subtitleFile || [];
    const subtitleList = [];

    for (let index = 0; index < parsedSubtitleEntries.length; index += 1) {
      const item = parsedSubtitleEntries[index];
      const file = Array.isArray(uploadedSubtitleFiles)
        ? uploadedSubtitleFiles[index]
        : uploadedSubtitleFiles;

      if (!file) continue;

      const uploadedSubtitle = await uploadToCloudinary(file.path, "subtitles");
      subtitleList.push({
        label: item?.label || item?.language || "Subtitle",
        language: item?.language || "English",
        file: uploadedSubtitle,
      });
    }

    // Legacy fallback for a single uploaded subtitle file
    if (subtitleList.length === 0 && req.files?.subtitleFile?.length) {
      const uploadedSubtitle = await uploadToCloudinary(
        req.files.subtitleFile[0].path,
        "subtitles",
      );
      subtitleList.push({
        label: req.body.subtitleLabel || "English",
        language: req.body.subtitleLanguage || "English",
        file: uploadedSubtitle,
      });
    }

    let posterImage = null;
    if (req.files?.posterImage?.length) {
      posterImage = await uploadToCloudinary(
        req.files.posterImage[0].path,
        "posters",
      );
    }

    let thumbnailImage = null;
    if (req.files?.thumbnailImage?.length) {
      thumbnailImage = await uploadToCloudinary(
        req.files.thumbnailImage[0].path,
        "thumbnails",
      );
    }

    let videoUrl = null;
    if (req.files?.videoFile?.length) {
      videoUrl = await uploadToCloudinary(
        req.files.videoFile[0].path,
        "videos",
      );
    }

    const movieData = {
      title,
      description,
      genre,
      duration: parseInt(duration, 10),
      rating: rating ? parseFloat(rating) : 0,
      lang: language,
      subtitle: subtitleList[0]?.language || language,
      subtitles: subtitleList,
      airedDate: new Date(airedDate),
      status: status || "Completed",
      quality: quality || "720p",
      contentType: contentType || "Movie",
      ageRating: ageRating || "PG-13",
      director: director || "",
      cast: parsedCast,
      releaseYear: releaseYear
        ? parseInt(releaseYear, 10)
        : new Date().getFullYear(),
      tags: parsedTags,
      isActive:
        req.body.isActive !== undefined ? req.body.isActive === "true" : true,
      createdBy: req.user.userId,
      posterImage,
      thumbnailImage,
      videoUrl,
      subtitleFile: subtitleList[0]?.file || null,
    };

    const movie = await Movie.create(movieData);

    successResponse(res, 201, "Movie created successfully", movie);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get all movies with pagination and filters
export const getAllMovies = async (req, res) => {
  try {
    const {
      page,
      limit,
      genre,
      language,
      status,
      search,
      contentType,
      ageRating,
      rating,
      subtitles,
      quality,
      duration,
      airedDate,
    } = req.query;

    const {
      page: pageNum,
      limit: limitNum,
      skip,
    } = paginationHelper(page, limit);

    let filter = {};

    if (genre) {
      filter.genre = { $in: [genre] };
    }

    if (language) {
      filter.lang = { $in: [language] };
    }

    if (status) {
      filter.status = status;
    }

    if (contentType) {
      filter.contentType = { $in: [contentType] };
    }

    if (ageRating) {
      filter.ageRating = ageRating;
    }

    if (rating) {
      const r = parseFloat(rating);
      if (!isNaN(r)) filter.rating = r;
    }

    if (subtitles) {
      filter.subtitles = subtitles;
    }

    if (quality) {
      filter.quality = quality;
    }

    if (duration) {
      // If the client provides a number, treat it as max duration in minutes
      const d = parseInt(duration, 10);
      if (!isNaN(d)) filter.duration = { $lte: d };
    }

    if (airedDate) {
      // filter movies aired on or after the provided date
      const date = new Date(airedDate);
      if (!isNaN(date.getTime())) filter.airedDate = { $gte: date };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const hasSearchOrFilter = Boolean(
      search ||
      genre ||
      language ||
      status ||
      contentType ||
      ageRating ||
      rating ||
      subtitles ||
      quality ||
      duration ||
      airedDate,
    );

    if (hasSearchOrFilter && pageNum === 1) {
      await Movie.updateMany(filter, { $inc: { searchCount: 1 } });
    }

    const totalMovies = await Movie.countDocuments(filter);
    const movies = await Movie.find(filter)
      .populate("createdBy", "name email")
      .sort(hasSearchOrFilter ? { searchCount: -1, createdAt: -1 } : { createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const paginationData = calculatePaginationData(
      pageNum,
      limitNum,
      totalMovies,
    );

    successResponse(res, 200, "Movies fetched successfully", {
      movies,
      pagination: paginationData,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get movie titles for search suggestions
export const getMovieTitles = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true })
      .select("title -_id")
      .sort({ title: 1 });

    successResponse(
      res,
      200,
      "Movie titles fetched successfully",
      movies.map((movie) => movie.title),
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const movie = await Movie.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true },
    ).populate("createdBy", "name email");

    if (!movie) {
      return errorResponse(res, 404, "Movie not found");
    }

    successResponse(res, 200, "Movie fetched successfully", movie);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const getMovieSubtitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang } = req.query;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return errorResponse(res, 404, "Movie not found");
    }

    const selectedSubtitle =
      (movie.subtitles || []).find(
        (entry) =>
          entry?.language &&
          (!lang ||
            entry.language.toLowerCase() === String(lang).toLowerCase()),
      ) ||
      (movie.subtitleFile?.url
        ? {
            file: { url: movie.subtitleFile.url },
            language: movie.subtitle || "English",
          }
        : null);

    if (!selectedSubtitle?.file?.url) {
      return errorResponse(res, 404, "Subtitle not found");
    }

    const subtitleResponse = await fetch(selectedSubtitle.file.url);

    if (!subtitleResponse.ok) {
      throw new Error("Failed to fetch subtitle file");
    }

    const subtitle = await subtitleResponse.text();

    res.setHeader("Content-Type", "text/vtt; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");

    return res.send(subtitle);
  } catch (error) {
    console.error("Subtitle fetch error:", error);
    return errorResponse(res, 500, "Failed to load subtitle");
  }
};

// Update movie (Admin only)
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return errorResponse(res, 404, "Movie not found");
    }

    const {
      title,
      description,
      genre,
      duration,
      rating,
      language,
      subtitles,
      airedDate,
      status,
      quality,
      contentType,
      ageRating,
      director,
      cast,
      releaseYear,
      tags,
      isActive,
      isNewRelease,
      subtitleEntries,
    } = req.body;

    if (title) movie.title = title;
    if (description) movie.description = description;
    if (genre) movie.genre = genre;
    if (duration) movie.duration = parseInt(duration, 10);
    if (rating !== undefined) movie.rating = parseFloat(rating);
    if (language) movie.lang = language;
    if (subtitles) movie.subtitles = subtitles;
    if (airedDate) movie.airedDate = new Date(airedDate);
    if (status) movie.status = status;
    if (quality) movie.quality = quality;
    if (contentType) movie.contentType = contentType;
    if (ageRating) movie.ageRating = ageRating;
    if (director !== undefined) movie.director = director;
    if (cast) movie.cast = parseArrayField(cast);
    if (releaseYear) movie.releaseYear = parseInt(releaseYear, 10);
    if (tags) movie.tags = parseArrayField(tags);
    if (isActive !== undefined) movie.isActive = isActive === "true";
    if (isNewRelease !== undefined)
      movie.isNewRelease = isNewRelease === "true";

    const parsedSubtitleEntries = Array.isArray(subtitleEntries)
      ? subtitleEntries
      : parseArrayField(subtitleEntries);

    if (parsedSubtitleEntries.length) {
      const uploadedSubtitleFiles =
        req.files?.subtitleFiles || req.files?.subtitleFile || [];
      const subtitleList = [];

      for (let index = 0; index < parsedSubtitleEntries.length; index += 1) {
        const item = parsedSubtitleEntries[index];
        const file = Array.isArray(uploadedSubtitleFiles)
          ? uploadedSubtitleFiles[index]
          : uploadedSubtitleFiles;

        if (!file) continue;

        const uploadedSubtitle = await uploadToCloudinary(
          file.path,
          "subtitles",
        );
        subtitleList.push({
          label: item?.label || item?.language || "Subtitle",
          language: item?.language || "English",
          file: uploadedSubtitle,
        });
      }

      if (subtitleList.length) {
        movie.subtitles = subtitleList;
        movie.subtitle = subtitleList[0].language;
        movie.subtitleFile = subtitleList[0].file;
      }
    } else if (req.files && req.files.subtitleFile) {
      if (movie.subtitleFile && movie.subtitleFile.publicId) {
        await deleteFromCloudinary(movie.subtitleFile.publicId);
      }
      movie.subtitleFile = await uploadToCloudinary(
        req.files.subtitleFile.path,
        "subtitles",
      );
      movie.subtitle = movie.subtitle || "English";
      movie.subtitles = [
        {
          label: movie.subtitle,
          language: movie.subtitle,
          file: movie.subtitleFile,
        },
      ];
    }

    // Update poster image if provided
    if (req.files && req.files.posterImage) {
      if (movie.posterImage && movie.posterImage.publicId) {
        await deleteFromCloudinary(movie.posterImage.publicId);
      }
      movie.posterImage = await uploadToCloudinary(
        req.files.posterImage.path,
        "posters",
      );
    }

    // Update thumbnail image if provided
    if (req.files && req.files.thumbnailImage) {
      if (movie.thumbnailImage && movie.thumbnailImage.publicId) {
        await deleteFromCloudinary(movie.thumbnailImage.publicId);
      }
      movie.thumbnailImage = await uploadToCloudinary(
        req.files.thumbnailImage.path,
        "thumbnails",
      );
    }

    // Update video if provided
    if (req.files && req.files.videoFile) {
      if (movie.videoUrl && movie.videoUrl.publicId) {
        await deleteFromCloudinary(movie.videoUrl.publicId);
      }
      movie.videoUrl = await uploadToCloudinary(
        req.files.videoFile.path,
        "videos",
      );
    }

    movie.updatedBy = req.user.userId;
    await movie.save();

    successResponse(res, 200, "Movie updated successfully", movie);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Delete movie (Admin only)
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return errorResponse(res, 404, "Movie not found");
    }

    // Delete from cloudinary
    if (movie.posterImage && movie.posterImage.publicId) {
      await deleteFromCloudinary(movie.posterImage.publicId);
    }
    if (movie.videoUrl && movie.videoUrl.publicId) {
      await deleteFromCloudinary(movie.videoUrl.publicId);
    }

    successResponse(res, 200, "Movie deleted successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get trending movies
export const getTrendingMovies = async (req, res) => {
  try {
    const { limit } = req.query;
    const limitNum = parseInt(limit) || 10;

    const movies = await Movie.find({ isActive: true })
      .sort({ viewCount: -1 })
      .limit(limitNum)
      .populate("createdBy", "name email");

    successResponse(res, 200, "Trending movies fetched successfully", movies);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get movies by genre
export const getMoviesByGenre = async (req, res) => {
  try {
    const { genre, page, limit } = req.query;
    const {
      page: pageNum,
      limit: limitNum,
      skip,
    } = paginationHelper(page, limit);

    if (!genre) {
      return errorResponse(res, 400, "Genre is required");
    }

    const totalMovies = await Movie.countDocuments({
      genre: genre,
      isActive: true,
    });

    if (pageNum === 1) {
      await Movie.updateMany(
        { genre, isActive: true },
        { $inc: { searchCount: 1 } },
      );
    }

    const movies = await Movie.find({ genre: genre, isActive: true })
      .sort({ searchCount: -1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate("createdBy", "name email");

    const paginationData = calculatePaginationData(
      pageNum,
      limitNum,
      totalMovies,
    );

    successResponse(res, 200, "Movies fetched successfully", {
      movies,
      pagination: paginationData,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Like a movie
export const likeMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const movie = await Movie.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true },
    );

    if (!movie) {
      return errorResponse(res, 404, "Movie not found");
    }

    successResponse(res, 200, "Movie liked successfully", movie);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Add to watchlist
export const addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.userId;

    if (!isValidObjectId(movieId)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const movieId_obj = movieId.toString();
    if (user.watchlist.includes(movieId_obj)) {
      return errorResponse(res, 409, "Movie already in watchlist");
    }

    user.watchlist.push(movieId);
    await user.save();

    successResponse(res, 200, "Added to watchlist", user.watchlist);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Remove from watchlist
export const removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.userId;

    if (!isValidObjectId(movieId)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { watchlist: movieId } },
      { new: true },
    );

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "Removed from watchlist", user.watchlist);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get watchlist
export const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate("watchlist");
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "Watchlist fetched successfully", user.watchlist);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Add to watch history
export const addToWatchHistory = async (req, res) => {
  try {
    const { movieId, duration } = req.body;
    const userId = req.user.userId;

    if (!isValidObjectId(movieId)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    // Check if movie already in watch history
    const existingHistory = user.watchHistory.find(
      (h) => h.movie.toString() === movieId,
    );

    if (existingHistory) {
      existingHistory.lastWatchedAt = new Date();
      existingHistory.duration = duration;
    } else {
      user.watchHistory.push({
        movie: movieId,
        duration: duration,
      });
    }

    await user.save();
    successResponse(res, 200, "Added to watch history");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get watch history
export const getWatchHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .populate("watchHistory.movie")
      .select("watchHistory");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(
      res,
      200,
      "Watch history fetched successfully",
      user.watchHistory,
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Activate/Deactivate movie
export const toggleMovieStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid movie ID");
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return errorResponse(res, 404, "Movie not found");
    }

    movie.isActive = !movie.isActive;
    await movie.save();

    successResponse(
      res,
      200,
      `Movie ${movie.isActive ? "activated" : "deactivated"} successfully`,
      movie,
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
