import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MovieCard({ movie }) {
  if (!movie) return null;

  return (
    <div className="group">
      <Link to={`/movies/${movie._id}`}>
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={movie.posterImage?.url}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300 p-3 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold text-sm sm:text-lg line-clamp-2 capitalize">
                {movie.title}
              </h3>

              <div className="flex items-center flex-wrap gap-2 mt-2 text-xs">
                <span className="text-yellow-400">
                  ⭐ {movie.rating || "N/A"}
                </span>

                <span className="bg-gray-600 text-white px-2 rounded">
                  {movie.quality || "HD"}
                </span>

                <span className="bg-green-300 text-black px-2 rounded">
                  {movie.subtitles.length > 0 ? `CC ${movie.subtitles.length}` : "CC 0"}
                </span>

                <span className="bg-fuchsia-300 text-black px-2 rounded">
                  {movie.contentType === "Movie"
                    ? "M"
                    : movie.language === "Series" // Kept your original conditional logic intact
                    ? "S"
                    : "TV"}
                </span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-gray-200 line-clamp-3">
                {movie.description}
              </p>

              <div className="mt-3 space-y-1 text-xs text-gray-200">
                <p>
                  <strong>Language:</strong> {movie.language || "N/A"}
                </p>
                <p>
                  <strong>Genre:</strong> {movie.genre || "N/A"}
                </p>
                <p>
                  <strong>Duration:</strong> {movie.duration} min
                </p>
                <p>
                  <strong>Status:</strong> {movie.status || "Released"}
                </p>
              </div>
            </div>

            <span className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-6 rounded-full inline-flex items-center transition-colors">
              ▶ Watch Now
            </span>
          </div>
        </div>
      </Link>

      {/* Static Movie Info Below Poster */}
      <div className="mt-3">
        <Link
          to={`/movies/${movie._id}`}
          className="text-white font-semibold text-sm sm:text-base line-clamp-1 capitalize hover:text-red-500 transition-colors"
        >
          {movie.title}
        </Link>

        <div className="flex justify-between mt-2 text-xs sm:text-sm">
          <span className="text-gray-300">{movie.genre}</span>
          <span className="text-gray-500">{movie.duration}m</span>
        </div>
      </div>
    </div>
  );
}

// Optional but highly recommended runtime type safety
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    posterImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quality: PropTypes.string,
    subtitles: PropTypes.arrayOf(PropTypes.string),
    contentType: PropTypes.string,
    language: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
  }).isRequired,
};

export default MovieCard;