import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api";
import MovieCard from "../shared/MovieCard";

function Movielist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/movies");
      const movieList =
        response?.data?.data?.movies || response?.data?.data || [];

      setMovies(movieList);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-white">Loading movies...</div>
    );
  }

  return (
    <section
      id="Movielist"
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12"
    >
      {/* Heading */}

      <div className="mb-8">
        <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl">
          Today&apos;s Top Trending
        </h2>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Discover the most watched movies on Nepshow.
        </p>
      </div>

      {/* Grid */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-5
        lg:gap-8
      "
      >
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default Movielist;
