import Navbar from '../../components/landing/Navbar'
import Herodiv from '../../components/landing/Herodiv'
import Movielist from '../../components/landing/Movielist'
import Query from '../../components/landing/Faq'
import Footer from '../../components/landing/Footer'
import Contact from '../../components/landing/Contact'
import Pricing from '../../components/landing/Pricing'
import Testimonial from '../../components/landing/Testimonial'

function HomePage() {
    return (
        <>
            <div className="custom-bg">
                <div className="h-screen bg-black bg-opacity-90">
                    <Navbar />
                    <Herodiv />
                </div>
            </div>
            <Movielist />
            <Pricing />
            <Testimonial />
            <Query />
            <Contact />
            <Footer />
        </>
    )
}

export default HomePage
