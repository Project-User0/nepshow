import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api";
import MovieCard from "../shared/MovieCard";

function Newmovies() {
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

        const newReleases = movieList.filter((movie) => movie.isNewRelease);
      setMovies(newReleases.slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-white flex justify-center items-center gap-2">
        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
        <span>Loading new releases...</span>
      </div>
    );
  }

  return (
    <section
      id="Movielist"
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-10"
    >
      {/* Dynamic Header */}
      <div className="mb-6 flex items-center justify-between border-b border-neutral-800 pb-4">
        <h2 className="text-white font-bold text-xl sm:text-2xl tracking-wide uppercase">
          Top New Movies
        </h2>
        <span className="text-xs bg-red-600/20 text-red-500 font-semibold px-3 py-1 rounded-full border border-red-600/30">
          Latest 10 Releases
        </span>
      </div>

      {/* Horizontal Scroll Layout Row */}
      <div
        className="
          flex 
          flex-nowrap 
          gap-4 
          sm:gap-5 
          lg:gap-6 
          overflow-x-auto 
          snap-x 
          snap-mandatory 
          pb-4
          [-webkit-overflow-scrolling:touch]
          [scrollbar-width:none] 
          [&::-webkit-scrollbar]:hidden
        "
      >
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="
              flex-none 
              w-[165px] 
              xs:w-[195px] 
              sm:w-[220px] 
              md:w-[240px] 
              snap-start 
              group 
              flex 
              flex-col 
              justify-between
            "
          >
              <MovieCard key={movie._id} movie={movie} />
    
          </div>
        ))}
      </div>
    </section>
  );
}

export default Newmovies;
