import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const mockKeywords = [
  "Kabaddi",
  "Kabaddi Kabaddi",
  "Loot",
  "Loot 2",
  "Pashupati Prasad",
  "Pashupati Prasad 2",
  "Jatra",
  "Jatrai Jatra",
  "Chhakka Panja",
  "Chhakka Panja 2",
  "Chhakka Panja 3",
  "Chhakka Panja 4",
  "Prem Geet",
  "Prem Geet 2",
  "Bulbul",
  "Darpan Chhaya",
  "Hostel",
  "Hostel Returns",
  "Appa",
  "Mahapurush",
  "Action",
  "Comedy",
  "Drama",
  "Romance",
  "Thriller",
  "Horror",
  "Bipin Karki",
  "Dayahang Rai",
  "Keki Adhikari",
  "Nepali Movie",
];

function Herodiv() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];

    return mockKeywords
      .filter((item) => item.toLowerCase().startsWith(search.toLowerCase()))
      .slice(0, 8);
  }, [search]);

  // Unified search handler with validation check
  const handleSearch = () => {
    if (!search.trim()) return; // 👈 Blocks empty or spacing-only submissions
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  // Allows user to press the Enter key to search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section
      className="
        pt-16
        md:pt-20
        min-h-[calc(100vh-64px)]
        md:min-h-[calc(100vh-80px)]
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        md:px-8
        lg:px-12
        xl:px-16
      "
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          {/* Heading */}
          <h1 className="max-w-5xl font-black leading-tight text-white text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            Watch Unlimited Movies,
            <br />
            TV Shows &<span className="text-red-600"> Entertainment</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-3xl text-gray-300 text-base sm:text-lg md:text-xl leading-8">
            Stream thousands of Nepali movies, TV shows, documentaries and
            exclusive originals anytime, anywhere.
          </p>

          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Starting from
            <span className="text-yellow-400 font-semibold">
              {" "}
              NPR 250/month
            </span>
          </p>

          {/* Search Inputs */}
          <div className="w-full max-w-3xl mt-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown} // 👈 Added Enter-key listener
                  placeholder="Search movies, actors, genres..."
                  className="w-full rounded-xl border border-neutral-700 bg-black/60 px-5 py-4 text-white outline-none focus:border-red-600"
                />

                {suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden shadow-2xl z-50">
                    {suggestions.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSearch(item);
                          // Automatically execute search when a suggestion is clicked
                          navigate(`/search?q=${encodeURIComponent(item)}`);
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-red-600 transition text-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSearch} // 👈 Using the unified, guarded handler
                disabled={!search.trim()} // 👈 Visually changes cursor style when empty
                className={`rounded-xl px-8 py-4 text-white font-semibold transition ${
                  search.trim() 
                    ? "bg-red-600 hover:bg-red-700 cursor-pointer" 
                    : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                }`}
              >
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">5K+</h2>
              <p className="text-gray-400 text-sm sm:text-base">Movies</p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                100K+
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">Users</p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">HD</h2>
              <p className="text-gray-400 text-sm sm:text-base">Streaming</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herodiv;