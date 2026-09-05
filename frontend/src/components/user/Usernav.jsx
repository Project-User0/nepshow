import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nepshow } from "../../images";
import { LogOut } from "lucide-react";
import { isAuthenticated, logoutAPI } from "../../utils/authMiddleware";

function Usernav() {
  const [isOpen, setIsOpen] = useState(false);
  const authenticated = isAuthenticated();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logoutAPI();
  };

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
    "Bagasala",
    "Dayahang Rai",
    "Keki Adhikari",
    "Nepali Movie",
  ];

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return mockKeywords
      .filter((item) => item.toLowerCase().startsWith(searchTerm.toLowerCase()))
      .slice(0, 8);
  }, [searchTerm]);

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!searchTerm || !searchTerm.trim()) return;
    navigate(`/filter?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <nav
      className={`py-2.5 fixed top-0 left-0 right-0 z-10 transition duration-300 ease-out 
       ${
         scrolled
           ? "bg-[#0d0d0fab] backdrop-blur-md"
           : "bg-[#0d0d0f] lg:bg-transparent"
       }`}
    >
      <div className="flex flex-wrap items-center justify-between xl:justify-around lg:justify-around max-w-screen px-4">
        <a href="/userdash" className="flex items-center bg-transparent">
          <img
            src={nepshow}
            className="lg:h-12 md:h-8 h-6 bg-transparent"
            alt="NepSHOW"
          />
        </a>

        <div className="flex items-center space-x-8">
          {/* Search Bar */}
          <div
            id="search-bar"
            className="hidden w-[420px] xl:flex lg:flex bg-white rounded-[2px] shadow-lg"
          >
            <form className="relative w-full" onSubmit={handleSearch}>
              <div className="flex items-center justify-between p-1 w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search here"
                  className="w-full rounded-md px-2 py-1 focus:outline-none"
                />
                <div className="flex items-center space-x-2">
                  <button className="bg-transparent" type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 font-semibold bg-transparent"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                  <a
                    href="/filter"
                    className="bg-gray-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                  >
                    Filter
                  </a>
                </div>
              </div>
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden shadow-2xl z-50">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSearchTerm(item);
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
            </form>
          </div>

          {/* Social Icons */}
          <div className="xl:flex hidden items-center justify-center space-x-2 h-full">
            <a
              href="https://www.reddit.com/"
              className="text-gray-200 hover:text-gray-100 rounded-full p-1.5 bg-[#ff3c1f] flex items-center justify-center"
            >
              <i className="fa-brands fa-reddit-alien text-[18px]"></i>
            </a>
            <a
              href="https://www.facebook.com"
              className="text-gray-200 hover:text-gray-100 rounded-full p-1.5 bg-blue-500 flex items-center justify-center"
            >
              <i className="fa-brands fa-facebook text-[18px]"></i>
            </a>
            <a
              href="https://www.whatsapp.com/"
              className="text-gray-200 hover:text-gray-100 rounded-full p-1.5 bg-green-500 flex items-center justify-center"
            >
              <i className="fa-brands fa-whatsapp text-[18px]"></i>
            </a>
            <a
              href="https://x.com/"
              className="text-gray-200 hover:text-gray-100 rounded-full p-1.5 bg-blue-500 flex items-center justify-center"
            >
              <i className="fa-brands fa-twitter text-[18px]"></i>
            </a>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden outline-none"
            aria-controls="mobile-menu-2"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile / Desktop Menu Wrapper */}
        <div
          className={`bg-transparent w-full lg:flex lg:w-auto ${isOpen ? "block" : "hidden"}`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col items-start w-full mt-4 font-medium space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6 lg:mt-0">
            {authenticated ? (
              <>
                <li className="w-full lg:w-auto bg-transparent">
                  <a
                    href="/profile"
                    className="flex flex-row py-2 pl-3 w-full lg:w-auto items-center pr-4 text-[14px] text-gray-200 bg-purple-700 rounded lg:bg-transparent lg:p-0 hover:text-white"
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 mr-2 lg:mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <span className="lg:hidden xl:block">Profile</span>
                  </a>
                </li>
                <li className="w-full lg:w-auto bg-transparent">
                  <a
                    href="/notifications"
                    className="flex flex-row py-2 pl-3 w-full lg:w-auto items-center pr-4 text-[14px] text-gray-200 border-b border-gray-800 lg:border-0 lg:p-0 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 mr-2 lg:mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                      />
                    </svg>
                    <span className="lg:hidden xl:block">Notification</span>
                  </a>
                </li>
                <li className="w-full lg:w-auto bg-transparent">
                  <a
                    href="/communitypost"
                    className="flex flex-row py-2 pl-3 w-full lg:w-auto items-center pr-4 text-[14px] text-gray-200 border-b border-gray-800 lg:border-0 lg:p-0 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 mr-2 lg:mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
                    <span className="lg:hidden xl:block">Community</span>
                  </a>
                </li>
                <li className="w-full lg:w-auto bg-transparent">
                  <a
                    href="/payment"
                    className="flex flex-row py-2 pl-3 w-full lg:w-auto items-center pr-4 text-[14px] text-gray-200 border-b border-gray-800 lg:border-0 lg:p-0 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 mr-2 lg:mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="lg:hidden xl:block">Pay</span>
                  </a>
                </li>
                <li className="w-full lg:w-auto bg-transparent">
                  <button
                    onClick={handleLogout}
                    className="flex flex-row py-2 pl-3 w-full lg:w-auto items-center pr-4 text-[14px] text-gray-200 border-b border-gray-800 lg:border-0 lg:p-0 hover:text-white"
                  >
                    <LogOut size={18} className="mr-2 lg:mr-1" />
                    <span className="lg:hidden xl:block">Logout</span>
                  </button>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Usernav;
