import React from "react";
import "./Market2.css";
import Navbar from "../../components/NavbarRest/NavbarRest";
import image1 from "../../assets/market-image.png";
import image2 from "../../assets/market-image2.png";
import image3 from "../../assets/market-image3.png";
import AverageSalesPrice from "../../components/Market/MarketRecap/AverageSalesPrice/AverageSalesPrice";
import SalesVolumeBreakdown from "../../components/Market/MarketRecap/SalesVolumeBreakdown/SalesVolumeBreakdown";
import SalesValueBreakdown from "../../components/Market/MarketRecap/SalesValueBreakdown/SalesValueBreakdown";
import PopularCards from "../../components/Market/MarketMovers/PopularCards/PopularCards";
import PopularSets from "../../components/Market/MarketMovers/PopularSets/PopularSets";
import PopularCharacters from "../../components/Market/MarketMovers/PopularCharacters/PopularCharacters";
import RecordHigh from "../../components/Market/RecordSales/RecordHigh/RecordHigh";
import RecordLow from "../../components/Market/RecordSales/RecordLow/RecordLow";
import PremiumSales from "../../components/Market/RecordSales/PremiumSales/PremiumSales";
import SalesVolumeByGC from "../../components/Market/GradingCompanies/SalesVolumByGC/SalesVolumeByGC";
// import Search from "../../components/Search/Search";
import MarketCheckBox from "../../components/MarketCheckBox/MarketCheckBox";
// import Data from "../../data/Ampharos.json";
// import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer_FYP/FooterFYP";
import axios from "axios";

export default function Market2() {
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
    <>
      <Navbar user={user} />
      <div className="market2">
        <div className="market2_NavSpace"></div>
        <div className="market2_Container">
          <div className="market2_Head">Market Research Tool</div>
          <div className="market2_Head_Text">
            A complete Analytical breakdown of all the sales data of all cards
            displayed to help you in making the
            best decisions for your trading card buying needs.
            <br />
            Find the average sales price, sales breakdowns based on volume and
            value. Find the most popular cards, sets or characters from the
            innumerable cards data in our database.
            <br />
            Analyze the recorded highest, lowest and premium sale cards along
            with the sales volume breakdown based on different grading
            companies.
            <br />
            <br />
            <div style={{ fontStyle: "italic" }}>
              Note : Please Register or Login as a Member to find the results of
              our research and records.
            </div>
          </div>
        </div>
        <div className="market2_image_container">
          <div className="market2_image_div">
            <img src={image1} className="market2_image" />
          </div>
          <div className="market2_image_div">
            <img src={image2} className="market2_image" />
          </div>
          <div className="market2_image_div">
            <img src={image3} className="market2_image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
