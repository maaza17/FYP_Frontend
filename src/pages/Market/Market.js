import React from "react";
import "./Market.css";
import Navbar from "../../components/NavbarRest/NavbarRest";
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

export default function Market({user, check, setCheck}) {
  // const [user, setUser] = React.useState({});
  // React.useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     axios
  //       .post("" + process.env.REACT_APP_BACKEND_URL + "api/user/getprofile", {
  //         token: sessionStorage.getItem("token"),
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data.success === true) {
  //           setUser(res.data.data);
  //         }
  //       });
  //     console.log(user);
  //   } else {
  //     setUser(null);
  //   }
  // }, [sessionStorage.getItem("token")]);
    return (
      <>
        <div className="market-body"></div>
        <Navbar user={user} check={check}
        setCheck={(val) => {
          setCheck(val);
        }}/>
        <div className="all market-page-title">
        </div>
        <div className="market">
          <div className=" all market__container">
            <div className="filter-main">
              <MarketCheckBox />
            </div>
            <br />
          </div>
          <div className="market__main">
            <div className="market__right__side">
              <div className="firstComponent" id="00">
                <AverageSalesPrice />
              </div>
              <div id="01">
                <SalesVolumeBreakdown />
              </div>
              <div id="02">
                <SalesValueBreakdown />
              </div>
              <div id="10">
                <PopularCards />
              </div>
              <div id="11">
                <PopularSets />
              </div>
              <div id="12">
                <PopularCharacters />
              </div>
              <div id="20">
                <RecordHigh />
              </div>
              <div id="21">
                <RecordLow />
              </div>
              <div id="22">
                <PremiumSales />
              </div>
              <div id="30">
                <SalesVolumeByGC />
              </div>
              <div className="market__hider"></div>
            </div>
          </div>
          <Footer />
        </div>
        
      </>
    );
  }

