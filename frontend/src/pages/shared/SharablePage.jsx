import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Usernav from "../../components/user/Usernav";
import Footer from "../../components/landing/Footer";
import { apiClient } from "../../utils/api";
import { nepshow } from "../../images";

function SharablePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!id || !token) {
      setError("This share link is invalid or has expired.");
      setLoading(false);
      return;
    }

    const loadMovie = async () => {
      try {
        const response = await apiClient.get(`/auth/shared/${id}`, {
          params: { token },
        });
        setMovie(response?.data?.data || null);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "This share link is invalid or has expired.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id, token]);

  const subtitleTracks =
    Array.isArray(movie?.subtitles) && movie.subtitles.length > 0
      ? movie.subtitles
          .filter((track) => track?.language || track?.label)
          .map((track) => ({
            label: track.label || track.language || "Subtitle",
            language: track.language || "English",
            fileUrl: track.file?.url || track.url || "",
          }))
      : movie?.subtitleFile?.url
        ? [
            {
              label: movie.subtitle || "English",
              language: movie.subtitle || "English",
              fileUrl: movie.subtitleFile.url,
            },
          ]
        : [];

  const getSubtitleTrackUrl = (track) => {
    if (!track?.fileUrl || !movie?._id) return "";

    return `${(import.meta.env.VITE_API_URL || "http://localhost:8000").replace(
      /\/+$/,
      "",
    )}/api/movies/${movie._id}/subtitle?lang=${encodeURIComponent(track.language)}`;
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

  if (loading) {
    return (
      <>
        <Usernav />
        <div className="min-h-screen flex items-center justify-center bg-[#090909] text-white">
          Loading shared movie...
        </div>
        <Footer />
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#090909] px-6 text-center text-white">
          <h1 className="text-3xl font-semibold">
            Unable to access this shared movie
          </h1>
          <p className="mt-3 text-gray-400">
            {error || "The link may have expired or is invalid."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-full bg-red-600 px-6 py-3 font-medium"
          >
            Go Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen sharable-custom-bg">
        <div className="bg-black bg-opacity-90 px-4 py-10">
          <div className="mx-auto max-w-6xl px-5 ">
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-black shadow-2xl">
              <video
                ref={videoRef}
                className="w-full aspect-video bg-black"
                poster={movie.thumbnailImage?.url || movie.posterImage?.url}
                controls
                controlsList="nodownload"
                disablePictureInPicture
                disableRemotePlayback
                playsInline
                preload="metadata"
                crossOrigin="anonymous"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src={movie.videoUrl?.url} type="video/mp4" />
                {subtitleTracks.map((track, index) => (
                  <track
                    key={`${track.language}-${index}`}
                    kind="subtitles"
                    srcLang={track.label}
                    label={track.language}
                    src={getSubtitleTrackUrl(track)}
                    default={index === -1}
                  />
                ))}
                Your browser doesn&apos;t support HTML5 video.
              </video>
              <div className="absolute top-4 left-4">
                <img
                  src={nepshow}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="mx-auto "
                />
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-white">
              <h1 className="text-3xl font-semibold">{movie.title}</h1>
              <p className="mt-4 text-gray-400">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SharablePage;
