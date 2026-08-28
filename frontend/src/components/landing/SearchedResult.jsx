import Footer from "../../components/landing/Footer";
import SearchedResult from "../../pages/shared/SearchResult";
import FilterBox from "./FilterBox";
import Navbar from "./Navbar";

function SearchPage() {
  return (
    <>
      <div className="searchdata min-h-screen bg-black flex flex-col justify-between">
        <Navbar />
        <div className="pt-4 flex-grow">
          <FilterBox />
          <SearchedResult />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SearchPage;
