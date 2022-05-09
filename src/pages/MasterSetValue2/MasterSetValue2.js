import React from "react";
import "./MasterSetValue2.css";
import Navbar from "../../components/NavbarRest/NavbarRest";
import image1 from "../../assets/master-image.png";
import image2 from "../../assets/master-image2.png";
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

export default function MasterSetValue2() {
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
      <div className="master_set_value2">
        <div className="master_set_value2_NavSpace"></div>
        <div className="master_set_value2_Container">
          <div className="master_set_value2_Head">
            Complete PSA Graded Master Set Value
          </div>
          <div className="master_set_value2_Head_Text">
            The complete set includes all holos, rares, commons, uncommons,
            reverse foils and secret rare cards in the set.
            <br />
            It does not include any graded sealed packs, promos, pre-release
            cards. Popular error variations (inverted back, miscut,
            off-centered, stained) are not included.
            <br />
            If no sales history for certain cards in the set, the card will not
            also be included in the chart. If certain cards does not have any
            recent sales info, we use the last sold price.
            <br />
            <br />
            <div style={{ fontStyle: "italic" }}>
              Note : Please Register or Login as a Member to find the results of
              our research and records.
            </div>
          </div>
        </div>
        <div className="master_set_value2_image_container">
          <div className="master_set_value2_image_div">
            <img src={image1} className="master_set_value2_image" />
          </div>
          <div className="master_set_value2_empty_div"></div>
        </div>
        <div className="master_set_value2_image_container">
          <div className="master_set_value2_empty_div"></div>
          <div className="master_set_value2_image_div">
            <img src={image2} className="master_set_value2_image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
