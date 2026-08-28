import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchmovies() {
    const [q, setQ] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/filter?q=${encodeURIComponent(q)}`);
    };

    return (
        <>
            <div id="search-bar" className="w-auto xl:flex lg:hidden xl:hidden bg-white rounded-md my-4">
                <form className="flex items-center justify-center p-1 w-full" onSubmit={handleSubmit}>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        type="text"
                        placeholder="Search movies here..."
                        className="w-full rounded-md px-2 py-1 focus:outline-none"
                    />
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
                </form>
            </div>
        </>
    )
}

export default Searchmovies
