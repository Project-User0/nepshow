import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Usernav from "../../components/user/Usernav";
import Footer from "../../components/landing/Footer";

import { apiClient } from "../../utils/api";
import { getStoredUser, isAuthenticated, isSubscriptionActive } from "../../utils/authMiddleware";

function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  const [error, setError] = useState("");
  const [sharing, setSharing] = useState(false);

  const videoRef = useRef(null);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    const user = getStoredUser();
    if (!isAuthenticated() || !isSubscriptionActive(user)) {
      navigate("/payment", { replace: true });
      return;
    }

    if (!id) return;

    loadMovie();
    loadRecommendedMovies();
  }, [id, navigate]);



  const loadMovie = async () => {
    try {
      setLoadingMovie(true);

      const response = await apiClient.get(`/movies/${id}`);

      setMovie(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Movie not found.");
    } finally {
      setLoadingMovie(false);
    }
  };

  const loadRecommendedMovies = async () => {
    try {
      setLoadingRecommendations(true);

      const response = await apiClient.get("/movies");

      const movies = response?.data?.data?.movies || response?.data?.data || [];

      const filtered = movies
        .filter((m) => m._id !== id && m.genre === response?.data?.data?.genre)
        .slice(0, 4);

      if (filtered.length < 4) {
        const remaining = movies
          .filter((m) => m._id !== id && !filtered.some((f) => f._id === m._id))
          .slice(0, 4 - filtered.length);

        filtered.push(...remaining);
      }

      setRecommendedMovies(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleShare = async () => {
    try {
      setSharing(true);
      const response = await apiClient.post('/auth/share-link', { movieId: id });
      const shareUrl = response?.data?.data?.shareUrl;
      if (shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        alert('Share link copied to clipboard. It will expire after 10 hours.');
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Unable to generate share link.');
    } finally {
      setSharing(false);
    }
  };

  useEffect(() => {
    const preventContextMenu = (e) => {
      e.preventDefault();
    };

    const preventKeys = (e) => {
      const key = e.key.toLowerCase();

      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Ctrl + S
      if (e.ctrlKey && key === "s") {
        e.preventDefault();
      }

      // Ctrl + U
      if (e.ctrlKey && key === "u") {
        e.preventDefault();
      }

      // Ctrl + Shift + I/J/C
      if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventKeys);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventKeys);
    };
  }, []);


  if (loadingMovie) {
    return (
      <>
        <Usernav />

        <div className="min-h-screen flex justify-center items-center">
          <div className="text-white text-xl animate-pulse">
            Loading Movie...
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Usernav />

        <div className="min-h-screen flex flex-col justify-center items-center space-y-5">
          <h1 className="text-4xl text-white font-bold">Movie Not Found</h1>

          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white"
          >
            Go Home
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Usernav />

      <div className="min-h-screen bg-[#090909] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-black">
            {videoLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                <div className="flex flex-col items-center space-y-5">
                  <div className="h-14 w-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />

                  <p className="text-white">Buffering...</p>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full aspect-video bg-black"
              poster={movie.posterImage?.url}
              controls
              controlsList="nodownload"
              disablePictureInPicture
              disableRemotePlayback
              playsInline
              preload="metadata"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onLoadedData={() => setVideoLoading(false)}
              onWaiting={() => setVideoLoading(true)}
              onPlaying={() => setVideoLoading(false)}
            >
              <source src={movie.videoUrl?.url} type="video/mp4" />
              Your browser doesn&apos;t support HTML5 video.
            </video>
          </div>
        </div>

        <section className="max-w-7xl mx-auto mt-10 px-5">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Side */}

            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {movie.title}
                </h1>

                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-sm">
                  {movie.quality}
                </span>

                <span className="px-3 py-1 rounded-full bg-neutral-700 text-white text-sm">
                  {movie.ageRating}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-5 text-gray-300">
                <div className="flex items-center gap-2">
                  ⭐<span>{movie.rating}/10</span>
                </div>

                <div className="flex items-center gap-2">
                  👁
                  <span>{movie.viewCount} Views</span>
                </div>

                <div className="flex items-center gap-2">
                  🎬
                  <span>{movie.duration} min</span>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-white text-2xl font-semibold mb-4">
                  Synopsis
                </h2>

                <p className="text-gray-400 leading-8">{movie.description}</p>
              </div>

              <button
                onClick={handleShare}
                disabled={sharing}
                className="mt-6 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sharing ? 'Creating share link...' : 'Share this movie'}
              </button>
            </div>

            {/* Right Side */}

            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6">
              <h2 className="text-white text-xl font-semibold mb-6">
                Movie Information
              </h2>

              <div className="space-y-5">
                <InfoRow title="Genre" value={movie.genre} />

                <InfoRow title="Language" value={movie.language} />

                <InfoRow title="Director" value={movie.director} />

                <InfoRow title="Cast" value={movie.cast?.join(", ")} />

                <InfoRow title="Quality" value={movie.quality} />

                <InfoRow title="Subtitles" value={movie.subtitles} />

                <InfoRow title="Release Year" value={movie.releaseYear} />

                <InfoRow title="Status" value={movie.status} />

                <InfoRow
                  title="Aired"
                  value={new Date(movie.airedDate).toLocaleDateString()}
                />
              </div>
            </div>
          </div>
        </section>
        {recommendedMovies.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                Recommended For You
              </h2>

              <button
                onClick={() => navigate("/userdash")}
                className="text-red-500 hover:text-red-400 font-medium"
              >
                View All →
              </button>
            </div>

            {loadingRecommendations ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-xl overflow-hidden bg-neutral-900"
                  >
                    <div className="aspect-[2/3] bg-neutral-800" />

                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-neutral-700 rounded" />

                      <div className="h-4 bg-neutral-800 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendedMovies.map((recommended) => (
                  <div
                    key={recommended._id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/preview/${recommended._id}`)}
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={recommended.posterImage?.url}
                        alt={recommended.title}
                        className="w-full aspect-[2/3] object-cover transition duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-medium shadow-lg">
                            ▶ Watch Now
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-white font-semibold text-lg truncate">
                        {recommended.title}
                      </h3>

                      <div className="flex justify-between mt-2 text-sm text-gray-400">
                        <span>{recommended.genre}</span>

                        <span>{recommended.duration} min</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-yellow-400">
                        ⭐
                        <span className="text-gray-300">
                          {recommended.rating}/10
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Preview;

function InfoRow({ title, value }) {
  return (
    <div className="flex justify-between gap-5 border-b border-neutral-800 pb-3">
      <span className="text-gray-400">{title}</span>

      <span className="text-white text-right">{value || "-"}</span>
    </div>
  );
}
