import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const genreOptions = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Religious",
  "Horror",
  "Drama",
  "Fantasy",
];
const languageOptions = ["English", "Nepali", "Hindi"];
const subtitleOptions = ["English", "Nepali", "Hindi", "Spanish", "French"];
const statusOptions = ["Ongoing", "Completed", "Airing"];
const qualityOptions = ["480p", "720p", "1080p", "2K", "4K"];
const contentTypeOptions = ["Movie", "Series", "TV"];
const ageRatingOptions = ["G", "PG", "PG-13", "R", "NC-17"];

const MovieForm = ({ movie, onSave, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    director: "",
    releaseYear: new Date().getFullYear(),
    rating: 0,
    duration: 0,
    language: "",
    subtitles: "",
    airedDate: "",
    status: "",
    quality: "",
    contentType: "",
    ageRating: "",
    cast: "",
    tags: "",
    isActive: true,
    isNewRelease: false,
    subtitleFile: null,
    posterImage: null,
    videoFile: null,
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        description: movie.description || "",
        genre: movie.genre || "",
        language: movie.lang || "",
        subtitles: movie.subtitles || "",
        director: movie.director || "",
        releaseYear: movie.releaseYear || new Date().getFullYear(),
        rating: movie.rating || 5,
        duration: movie.duration || 120,
        airedDate: movie.airedDate
          ? new Date(movie.airedDate).toISOString().split("T")[0]
          : "",
        status: movie.status || "Completed",
        quality: movie.quality || "720p",
        contentType: movie.contentType || "Movie",
        ageRating: movie.ageRating || "PG-13",
        cast: (movie.cast || []).join(", "),
        tags: (movie.tags || []).join(", "),
        isActive: movie.isActive !== false,
        isNewRelease: movie.isNewRelease !== false,
        subtitleFile: null,
        posterImage: null,
        videoFile: null,
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return; // Prevent extra triggers if clicked consecutively

    setIsLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("genre", formData.genre);
      payload.append("language", formData.language);
      payload.append("subtitles", formData.subtitles);
      payload.append("director", formData.director);
      payload.append("releaseYear", formData.releaseYear);
      payload.append("rating", formData.rating);
      payload.append("duration", formData.duration);
      payload.append("airedDate", formData.airedDate);
      payload.append("status", formData.status);
      payload.append("quality", formData.quality);
      payload.append("contentType", formData.contentType);
      payload.append("ageRating", formData.ageRating);
      payload.append(
        "cast",
        JSON.stringify(
          formData.cast
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );
      payload.append(
        "tags",
        JSON.stringify(
          formData.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );
      payload.append("isActive", String(formData.isActive));
      payload.append("isNewRelease", String(formData.isNewRelease));

      if (formData.subtitleFile) {
        payload.append("subtitleFile", formData.subtitleFile);
      }

      if (formData.posterImage) {
        payload.append("posterImage", formData.posterImage);
      }

      if (formData.videoFile) {
        payload.append("videoFile", formData.videoFile);
      }

      // Wrapped in an await in case onSave is asynchronous
      await onSave(payload);
    } catch (error) {
      console.error("Submission failed:", error);
      setIsLoading(false); // Only turn off loading on error if modal stays open
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">
            {movie ? "Edit Movie" : "Add Movie"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Director
              </label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genres
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {genreOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {languageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitles
              </label>
              <select
                name="subtitles"
                value={formData.subtitles}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {subtitleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle File
              </label>
              <input
                type="file"
                name="subtitleFile"
                accept=".srt,.vtt"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Release Year
              </label>
              <input
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aired Date
              </label>
              <input
                type="date"
                name="airedDate"
                value={formData.airedDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality
              </label>
              <select
                name="quality"
                value={formData.quality}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {qualityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {contentTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Rating
              </label>
              <select
                name="ageRating"
                value={formData.ageRating}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {ageRatingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cast
              </label>
              <input
                type="text"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                placeholder="Jane Doe, John Smith"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="popular, new, trending"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poster Image
              </label>
              <input
                type="file"
                name="posterImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File
              </label>
              <input
                type="file"
                name="videoFile"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active movie
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="isNewRelease"
              checked={formData.isNewRelease}
              onChange={handleChange}
            />
            New Release
          </label>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

MovieForm.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
    releaseYear: PropTypes.number,
    rating: PropTypes.number,
    duration: PropTypes.number,
    lang: PropTypes.string,
    subtitles: PropTypes.string,
    airedDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    status: PropTypes.string,
    quality: PropTypes.string,
    contentType: PropTypes.string,
    price: PropTypes.number,
    ageRating: PropTypes.string,
    cast: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    isActive: PropTypes.bool,
    isNewRelease: PropTypes.bool,
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieForm;
