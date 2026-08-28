import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api";
import Pagination from "../../components/shared/Pagination";
import MovieCard from "../../components/shared/MovieCard";

function SearchedResult() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return {
      q: params.get("q") || "",
      genre: params.get("genre") || "",
      language: params.get("language") || "",
      status: params.get("status") || "",
      contentType: params.get("contentType") || "",
      ageRating: params.get("ageRating") || "",
      rating: params.get("rating") || "",
      subtitles: params.get("subtitles") || "",
      quality: params.get("quality") || "",
      duration: params.get("duration") || "",
      airedDate: params.get("airedDate") || "",
    };
  };

  useEffect(() => {
    const qparams = getQuery();
    // map q -> search for backend
    const params = {
      search: qparams.q,
      genre: qparams.genre,
      language: qparams.language,
      status: qparams.status,
      contentType: qparams.contentType,
      ageRating: qparams.ageRating,
      rating: qparams.rating,
      subtitles: qparams.subtitles,
      quality: qparams.quality,
      duration: qparams.duration,
      airedDate: qparams.airedDate,
    };

    // Remove empty keys
    Object.keys(params).forEach((k) => {
      if (
        params[k] === undefined ||
        params[k] === null ||
        String(params[k]).trim() === ""
      ) {
        delete params[k];
      }
    });

    // 💡 FIX: Check if there are any active keys remaining.
    // If the object is completely empty, don't call the API!
    // if (Object.keys(params).length === 0) {
    //   setMovies([]); // Clear the page out
    //   return;
    // }

    loadMovies(params);
  }, [location.search]);

  const loadMovies = async (params = {}) => {
    try {
      setLoading(true);
      const response = await apiClient.get("/movies", { params });
      const movieList =
        response?.data?.data?.movies || response?.data?.data || [];
      setResponse(response);
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
    <>
      <section
        id="Movielist"
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12"
      >
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl">
            Your Search Result
          </h2>
        </div>

        {/* Conditional Rendering: Check if data is available */}
        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-[#272626c8] rounded-2xl border border-neutral-800 shadow-lg">
            <span className="text-5xl mb-4">🔍</span>
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">
              No results found
            </h3>
            <p className="text-gray-400 text-sm max-w-md">
              We couldn&apos;t find anything matching your filters or search
              terms. Try adjusting your selections or trying a different
              keyword.
            </p>
          </div>
        ) : (
          /* Grid */
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
        )}

        <Pagination
          paginationData={{
            page: response?.data?.paginationData?.page,
            totalPages: response?.data?.paginationData?.totalPages,
            hasNextPage: response?.data?.paginationData?.hasNextPage,
            hasPrevPage: response?.data?.paginationData?.hasPrevPage,
          }}
          onPageChange={() => {}}
        />
      </section>
    </>
  );
}

export default SearchedResult;
