import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient, refreshUserState } from "../../utils/api";
import {
  getStoredUser,
  isAuthenticated,
  isSubscriptionActive,
} from "../../utils/authMiddleware";

function Moviedetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loadedMovieId = useRef(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. useCallback keeps loadMovie's reference stable across renders
  const loadMovie = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/movies/${id}`);
      setMovie(response?.data?.data);
    } catch (error) {
      console.error("Failed to fetch movie", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id && loadedMovieId.current !== id) {
      loadedMovieId.current = id;
      loadMovie();
    }
  }, [id, loadMovie]);

  // 2. Fetch fresh user details when they click "Watch"
  const handlePreview = async () => {
    const isUserLoggedIn = isAuthenticated();
    if (!isUserLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const refreshedUser = await refreshUserState();
      const currentUser = refreshedUser || getStoredUser();
      const hasActiveSub = isSubscriptionActive(currentUser);

      if (!hasActiveSub) {
        navigate("/payment");
        return;
      }

      navigate(`/preview/${id}`);
    } catch (error) {
      console.error("Failed to verify subscription", error);
      navigate("/payment");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: movie?.name, // Use actual movie title property
          text: movie?.description || "Check out this movie!",
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Movie link copied to clipboard!");
      } catch (err) {
        console.error("Could not copy link:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading movie...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen details">
      <div className="min-h-screen backdrop-blur-lg bg-[#000000b1] bg-opacity-90 flex items-center justify-center">
        <div className="h-auto my-8 bg-transparent">
          <div className="bg-transparent max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-transparent flex flex-col md:flex-row -mx-4">
              <div className="bg-transparent md:flex-1">
                <div className="bg-transparent h-[460px] flex items-center justify-center rounded-lg mb-4">
                  <img
                    className="h-full w-full xl:p-0 lg:p-0 p-4 object-cover rounded-md"
                    src={movie.posterImage?.url}
                    alt="Product Image"
                  />
                </div>
              </div>
              <div className="bg-transparent md:flex-1 px-4 py-4">
                <p className="bg-transparent text-gray-300 text-sm mb-4">
                  National TV {movie.title}
                </p>
                <h2 className="bg-transparent text-5xl font-semibold text-gray-800 dark:text-white mb-2">
                  {movie.title || "Movie Name"}
                </h2>
                <div className="bg-transparent text-white py-4 flex text-[16px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="orange"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="orange"
                    className="size-5 m-[1px] mr-1 bg-transparent"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>{" "}
                  {movie.rating || "N/A"} / 10 BY NEPALI MOVIE INDUSTRY
                </div>
                <div className="flex w-full bg-transparent">
                  <div className="h-5 w-10 items-center text-center text-[12px] justify-center flex rounded-l-[4px] bg-gray-600 text-white">
                    {movie.quality || "HD"}
                  </div>
                  <div className="h-5 w-8 flex items-center justify-center text-center mr-[2px] bg-green-300 text-black text-[12px] ml-[2px]">
                    {movie.subtitles.length > 0 ? `CC ${movie.subtitles.length}` : "CC 0"}
                  </div>
                  <div className="h-5 w-8 flex items-center justify-center rounded-r-[4px] text-[13px] text-black bg-fuchsia-300">
                    {movie.contentType === "Movie"
                      ? "M"
                      : movie.language === "Series"
                        ? "S"
                        : "TV"}
                  </div>
                  <div className="h-5 w-20 flex items-center justify-center rounded-[4px] text-[13px] text-black bg-stone-300 ml-4">
                    DUR .{movie.duration}min
                  </div>
                </div>

                <div className="bg-transparent py-6">
                  <div className="bg-transparent flex w-full xl:justify-left xl:space-x-2">
                    <div className="bg-transparent [200px] mb-2 sm:mb-0">
                      <button
                        onClick={() => {
                          handlePreview(movie._id);
                        }}
                        className="w-full bg-gray-900 flex dark:bg-gray-600 text-white py-2 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        Watch
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5 m-[2px] bg-transparent"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      className="w-full bg-gray-200 flex dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                      onClick={handleShare}
                    >
                      Share
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 m-1 bg-transparent"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-transparent">
                  <span className="bg-transparent font-bold text-white">
                    Movie Description:
                  </span>
                  <p className="bg-transparent text-gray-100 text-sm mt-2">
                    {movie.description ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Moviedetails;
