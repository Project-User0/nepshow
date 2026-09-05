import { useEffect, useState } from "react";
import Usernav from "./Usernav";
import { apiClient } from "../../utils/api";

function Slider() {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await apiClient.get("/movies/trending?limit=10");
        const trendingMovies = response?.data?.data || [];
        setMovies(Array.isArray(trendingMovies) ? trendingMovies : []);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
        setMovies([]);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    if (!movies.length) return undefined;

    const slideInterval = setInterval(() => {
      setTransitionEnabled(true);
      setCurrentSlide((prevSlide) =>
        prevSlide >= movies.length - 1 ? 0 : prevSlide + 1,
      );
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [movies.length]);

  useEffect(() => {
    if (!movies.length) return undefined;

    if (currentSlide === movies.length - 1) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentSlide(0);
      }, 500);

      return () => clearTimeout(timeout);
    }

    setTransitionEnabled(true);
    return undefined;
  }, [currentSlide, movies.length]);

  const handleLabelClick = (slideNumber) => {
    setTransitionEnabled(true);
    setCurrentSlide(slideNumber);
  };

  const handleShare = async (movie) => {
    const shareUrl = `${window.location.origin}/preview/${movie._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing content:", error);
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Share link copied to clipboard.");
    } catch (error) {
      console.error("Copy failed:", error);
      alert(
        "Share not supported on this browser. Please copy the URL manually.",
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-[500px]">
      <Usernav />
      <div className="w-full h-full overflow-hidden relative">
        {movies.length > 0 ? (
          <>
            <div
              id="slides"
              className={`flex h-full w-full ${
                transitionEnabled
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {movies.map((movie, index) => (
                <div
                  key={movie._id || index}
                  className="slide flex items-center justify-start min-w-full h-full text-white"
                  style={{
                    backgroundImage: movie.thumbnailImage?.url
                      ? `url(${movie.thumbnailImage.url})`
                      : "linear-gradient(135deg, #1f2937, #111827)",

                    backgroundColor: "#0d0d0fe6",
                    backgroundBlendMode: "overlay",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",

                    maskImage:
                      "linear-gradient(180deg, black 70%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(180deg, black 70%, transparent 100%)",
                  }}
                >
                  <div className="content pt-10 px-6 xl:px-14 lg:px-14 w-full xl:w-4/5 lg:w-3/4">
                    <h3 className="subtitle text-xl font-bold xl:pb-1 lg:pb-1 text-purple-400 inline-block">
                      #{index + 1} Trending
                    </h3>

                    <h1 className="xl:text-5xl lg:text-4xl text-2xl text-white font-semibold xl:py-2 lg:py-2">
                      {movie.title}
                    </h1>

                    <div className="lg:flex xl:flex py-2 w-full bg-transparent xl:py-4">
                      <div className="flex bg-transparent py-2">
                        <div className="h-5 w-8 items-center text-center text-[12px] justify-center flex rounded-l-[4px] bg-gray-600 text-white">
                          {movie.quality || "HD"}
                        </div>

                        <div className="h-5 w-8 flex items-center justify-center text-center mr-[2px] bg-green-300 text-black text-[12px] ml-[2px]">
                          {movie.subtitles.length > 0 ? `CC ${movie.subtitles.length}` : "CC 0"}
                        </div>

                        <div className="h-5 w-10 flex items-center justify-center rounded-r-[4px] text-[13px] text-black bg-fuchsia-300">
                          {movie.contentType || "TV"}
                        </div>
                      </div>

                      <div className="flex items-center rounded-[4px] xl:text-[16px] lg:text-[16px] text-[12px] text-white xl:font-semibold lg:font-semibold h-5 xl:h-9 lg:h-9 xl:ml-4 lg:ml-4">
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
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        {movie.duration || 100}m
                        <p className="text-white flex xl:text-md lg:text-md text-[12px] items-center xl:px-4 lg:px-4 ml-1 px-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4 m-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                            />
                          </svg>

                          {movie.airedDate
                            ? new Date(movie.airedDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "Recently"}
                        </p>
                      </div>
                    </div>

                    <p className="description text-[13px] xl:text-[16px] lg:text-[16px]">
                      {movie.description}
                    </p>

                    <div className="bg-transparent py-6">
                      <div className="bg-transparent flex w-full space-x-3">
                        <a
                          href={`/preview/${movie._id}`}
                          className="bg-amber-100 flex text-black xl:py-2 lg:py-2 py-1 xl:px-5 lg:px-5 px-2 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-800 hover:text-white"
                        >
                          Watch Now
                        </a>

                        <button
                          type="button"
                          onClick={() => handleShare(movie)}
                          className="bg-zinc-800 flex text-white xl:py-2 lg:py-2 py-1 xl:px-6 lg:px-6 px-3 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-300 hover:text-black"
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {movies.map((movie, index) => (
                <label
                  key={`bullet-${movie._id || index}`}
                  className="bullet cursor-pointer w-4 h-4 rounded-full bg-[#141414d5] shadow shadow-white hover:scale-125"
                  onClick={() => handleLabelClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#111827] text-white">
            Loading trending movies...
          </div>
        )}
      </div>
    </div>
  );
}

export default Slider;
