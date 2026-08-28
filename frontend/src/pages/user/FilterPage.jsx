import Usernav from '../../components/user/Usernav'
import Footer from '../../components/landing/Footer'
import Pagination from '../../components/shared/Pagination'
import Filterbox from '../../components/user/Filterbox'
import SearchResult from '../shared/SearchResult'

function FilterPage() {
    return (
        <>
            <div className="searchdata">
                <Usernav />
                <Filterbox />
                <SearchResult />
                <Pagination />
                <Footer />
            </div>
        </>
    )

}

export default FilterPage