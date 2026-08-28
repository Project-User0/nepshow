import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Searchmovies from "./Searchmovies";
import { useEffect } from "react";

function Filterbox() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    contentType: "",
    status: "",
    ageRating: "",
    rating: "",
    language: "",
    subtitles: "",
    quality: "",
    duration: "",
    airedDate: "",
    genre: "",
  });

  // Sync state whenever the URL parameters change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const updatedFilters = {};

    Object.keys(filters).forEach((key) => {
      updatedFilters[key] = params.get(key) || "";
    });

    setFilters(updatedFilters);
  }, [location.search]);

  const handleSelectChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenreClick = (genreName) => {
    setFilters((prev) => ({
      ...prev,
      genre: prev.genre === genreName ? "" : genreName,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(location.search);

    // merge filters into params, preserving existing q param if present
    Object.keys(filters).forEach((key) => {
      const val = filters[key];
      if (val !== undefined && val !== null && String(val) !== "") {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });

    navigate(`/filter?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      contentType: "",
      status: "",
      ageRating: "",
      rating: "",
      language: "",
      subtitles: "",
      quality: "",
      duration: "",
      airedDate: "",
      genre: "",
    });
    navigate("/filter");
  };

  // keep genre clicks and selects updating state but not auto-applying; user presses Apply

  return (
    <>
      <div className="max-w-full mx-auto py-4 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-20 mt-20">
        <div className="bg-[#272626c8] px-4 py-4 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-10 xl:px-14 xl:py-10 rounded-[16px] shadow-lg">
          <Searchmovies />

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-semibold mb-4">
            Filter
          </h2>

          {/* Filter Dropdowns Grid */}
          <div className="w-fit grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-2 gap-x-2 mb-4">
            {/* 1. contentType (Type) */}
            <div className="flex items-center border border-gray-700 space-x-2 px-2 w-[140px] h-10 bg-transparent rounded mb-2 sm:mb-0">
              <label className="text-white font-semibold text-[13px]">
                Type
              </label>
              <select
                value={filters.contentType}
                onChange={(e) =>
                  handleSelectChange("contentType", e.target.value)
                }
                className="no-arrow w-full sm:w-20 text-rose-300 pl-2 text-[13px] bg-transparent outline-none cursor-pointer"
              >
                <option value="" className="bg-neutral-800">
                  All
                </option>
                <option value="Movie" className="bg-neutral-800">
                  Movie
                </option>
                <option value="TV" className="bg-neutral-800">
                  TV
                </option>
                <option value="Series" className="bg-neutral-800">
                  Series
                </option>
              </select>
            </div>

            {/* 2. status */}
            <div className="flex items-center border border-gray-700 space-x-2 px-2 w-[140px] h-10 bg-transparent rounded mb-2 sm:mb-0">
              <label className="text-white font-semibold text-[13px]">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleSelectChange("status", e.target.value)}
                className="no-arrow w-full sm:w-20 text-white px-2 text-[13px] bg-transparent outline-none cursor-pointer"
              >
                <option value="" className="bg-neutral-800">
                  All
                </option>
                <option value="Completed" className="bg-neutral-800">
                  Completed
                </option>
                <option value="Airing" className="bg-neutral-800">
                  Airing
                </option>
                <option value="Ongoing" className="bg-neutral-800">
                  Ongoing
                </option>
              </select>
            </div>

            {/* 3. ageRating (Rated) */}
            <div className="flex items-center border border-gray-700 space-x-2 px-2 w-[140px] h-10 bg-transparent rounded mb-2 sm:mb-0">
              <label className="text-white font-semibold text-[13px]">
                Rated
              </label>
              <select
                value={filters.ageRating}
                onChange={(e) =>
                  handleSelectChange("ageRating", e.target.value)
                }
                className="no-arrow w-full sm:w-20 text-white px-2 text-[13px] bg-transparent outline-none cursor-pointer"
              >
                <option value="" className="bg-neutral-800">
                  All
                </option>
                <option value="G" className="bg-neutral-800">
                  G
                </option>
                <option value="PG" className="bg-neutral-800">
                  PG
                </option>
                <option value="PG-13" className="bg-neutral-800">
                  PG-13
                </option>
                <option value="R" className="bg-neutral-800">
                  R
                </option>
              </select>
            </div>

            {/* 4. rating (Score) */}
            <div className="flex items-center border border-gray-700 space-x-2 px-2 w-[140px] h-10 bg-transparent rounded mb-2 sm:mb-0">
              <label className="text-white font-semibold text-[13px]">
                IMDB
              </label>
              <select
                value={filters.rating}
                onChange={(e) =>
                  handleSelectChange("rating", Number(e.target.value) || "")
                }
                className="no-arrow w-full sm:w-20 text-white px-2 text-[13px] bg-transparent outline-none cursor-pointer"
              >
                <option value="" className="bg-neutral-800">
                  All
                </option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num} className="bg-neutral-800">
                    {num} Stars
                  </option>
                ))}
              </select>
            </div>

            {/* 5. language */}
            <div className="flex items-center border border-gray-700 space-x-2 px-2 w-[140px] h-10 bg-transparent rounded mb-2 sm:mb-0">
              <label className="text-white font-semibold text-[13px]">
                Lang
              </label>
              <select
                value={filters.language}
                onChange={(e) => handleSelectChange("language", e.target.value)}
                className="no-arrow w-full sm:w-20 text-white px-2 text-[13px] bg-transparent outline-none cursor-pointer"
              >
                <option value="" className="bg-neutral-800">
                  All
                </option>
                <option value="Nepali" className="bg-neutral-800">
                  Nepali
                </option>
                <option value="English" className="bg-neutral-800">
                  English
                </option>
                <option value="Hindi" className="bg-neutral-800">
                  Hindi
                </option>
              </select>
            </div>

            {/* 6. subtitles */}
            <div className="flex items-center border border-gray-700 space-x-2 px-2 w-[140px] h-10 bg-transparent rounded mb-2 sm:mb-0">
              <label className="text-white font-semibold text-[13px]">
                Subs
              </label>
              <select
                value={filters.subtitles}
                onChange={(e) =>
                  handleSelectChange("subtitles", e.target.value)
                }
                className="no-arrow w-full sm:w-20 text-white px-2 text-[13px] bg-transparent outline-none cursor-pointer"
              >
                <option value="" className="bg-neutral-800">
                  All
                </option>
                <option value="English" className="bg-neutral-800">
                  English
                </option>
                <option value="None" className="bg-neutral-800">
                  None
                </option>
              </select>
            </div>

            {/* 7. quality */}
            <div className="flex items-center border border-gray-700 space-x-2 px-2 w-[140px] h-10 bg-transparent rounded mb-2 sm:mb-0">
              <label className="text-white font-semibold text-[13px]">
                Quality
              </label>
              <select
                value={filters.quality}
                onChange={(e) => handleSelectChange("quality", e.target.value)}
                className="no-arrow w-full sm:w-20 text-white px-2 text-[13px] bg-transparent outline-none cursor-pointer"
              >
                <option value="" className="bg-neutral-800">
                  All
                </option>
                <option value="720p" className="bg-neutral-800">
                  720p
                </option>
                <option value="1080p" className="bg-neutral-800">
                  1080p
                </option>
              </select>
            </div>

            {/* 9. airedDate (Simplified Date Selection matching ISO formats) */}
            <div className="flex items-center border border-gray-700 space-x-2 px-2 h-10 bg-transparent rounded mb-2 sm:mb-0">
              <label className="text-white font-semibold text-[13px]">
                Aired
              </label>
              <input
                type="date"
                value={filters.airedDate ? filters.airedDate.split("T")[0] : ""}
                onChange={(e) =>
                  handleSelectChange(
                    "airedDate",
                    e.target.value ? `${e.target.value}T00:00:00.000Z` : "",
                  )
                }
                className="w-full text-white text-[11px] bg-transparent outline-none cursor-pointer inverted-colors"
              />
            </div>
          </div>

          {/* Genre Section */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-semibold mb-4">
            Genre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
            {[
              "Action",
              "Adventure",
              "Cars",
              "Comedy",
              "Religious",
              "Horror",
              "Drama",
              "Fantasy",
            ].map((g) => (
              <button
                key={g}
                onClick={() => handleGenreClick(g)}
                className={`border border-gray-700 rounded-md px-1 py-1 transition-colors text-[14px] ${
                  filters.genre === g
                    ? "bg-rose-400 text-black border-rose-400 font-medium"
                    : "bg-transparent text-white hover:bg-neutral-800"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2 mx-2">
            <button
              onClick={applyFilters}
              className="bg-red-600 text-white px-4 py-1.5 rounded-md"
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-700 text-white px-4 py-1.5 rounded-md"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filterbox;
