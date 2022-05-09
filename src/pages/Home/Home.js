import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import "./Home.css";
import Featured from "../../components/Featured/Featured";
import LatestSet from "../../components/LatestSet/LatestSet";
import Articles from "../../components/Articles/Articles";
import Newsletter from "../../components/Newsletter/Newsletter";
import HomeChart from "../../components/HomeChart/HomeChart";
import Navbar from "../../components/NavbarRest/NavbarRest";
import Banner from "../../components/Banner/Banner";
import NavButtons from "../../components/NavButtons/NavButtons";
import axios from "axios";
import Footer from "../../components/Footer_FYP/FooterFYP";

function Home() {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("" + process.env.REACT_APP_BACKEND_URL + "api/user/getprofile", {
          token: sessionStorage.getItem("token"),
        })
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            setUser(res.data.data);
          }
        });
      console.log(user);
    } else {
      setUser(null);
    }
  }, [sessionStorage.getItem("token")]);
  return (
    <div className="home">
      <Navbar
        user={user}
        
      />
      <div className="navbar__space"></div>
      <HeroSection />
      <NavButtons />
      <Featured />
      <div className="homeChart__container">
        <HomeChart />
      </div>
      <Banner user={user}/>
      {/* {sessionStorage.getItem("token") ? (
        <>
          
          <div className="latest__set__and__articles">
            <div className="latest_set_section">
              <LatestSet />
            </div>
            <div className="article_section">
              <Articles />
            </div>
          </div>
        </>
      ) : (
        <></>
      )} */}
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
