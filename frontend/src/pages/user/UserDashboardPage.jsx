import Footer from "../../components/landing/Footer";
import Slider from "../../components/user/Slider";
import Newmovies from "../../components/user/Newmovies";
import Filterbox from "../../components/user/Filterbox";
import Movielist from "../../components/landing/Movielist";

function UserDashboardPage() {
  return (
    <>
      <Slider />
      <div className="w-full xl:hidden lg:hidden flex">
        <Filterbox />
      </div>
      <Newmovies />
      <Movielist />

      <Footer />
    </>
  );
}

export default UserDashboardPage;
