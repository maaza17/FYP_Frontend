import React, { useState } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import "./Favourite.css";
import Featured from "../../components/Featured/Featured";
import LatestSet from "../../components/LatestSet/LatestSet";
import Articles from "../../components/Articles/Articles";
import Newsletter from "../../components/Newsletter/Newsletter";
import HomeChart from "../../components/HomeChart/HomeChart";
import Navbar from "../../components/NavbarRest/NavbarRest";
import Banner from "../../components/Banner/Banner";
import NavButtons from "../../components/NavButtons/NavButtons";
import axios from "axios";
import empty from "../../assets/images/empty.png";
import Footer from "../../components/Footer_FYP/FooterFYP";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

function Favourite({user, check, setCheck}) {
  // const [user, setUser] = React.useState({});
  const [error, setError] = React.useState(false);
  const [finalList, setFinalList] = useState(null);
  const [totalCards, setTotalCards] = useState(null);
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

  React.useEffect(() => {
    axios
      .post(
        "" + process.env.REACT_APP_BACKEND_URL + "api/user/getfavourites",
        // "http://localhost:7000/api/cards/searchshop",
        {
          token: sessionStorage.getItem("token"),
        }
      )
      .then((res) => {
        console.log(res.data.data);
        // if (res.data.error) {
        //   console.log(res.data.message);
        //   setError(true);
        // } else {
        //   setTotalCards(res.data.count);
        setFinalList(res.data.data);
        // }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  function listItems() {
    if (finalList.length > 0) {
      return finalList.map((item) => {
        return (
          <div className="favourite__card">
            <div key={item.id}>
              <Link
                to={`/product?id=${item._id}&cardNumber=${item.sub_cat[0].card_id}`}
              >
                <img
                  className="favourite__card_img"
                  src={item.sub_cat[0].image}
                  onError={(e) => (e.target.src = empty)}
                  alt="IMG"
                />
              </Link>
              <div className="favourite__cardInfo">
                <div className="favourite__cardText">
                  <p className="favourite__cardName">
                    {item.name}{" "}
                    {item.card_number && item.card_number !== "Missing" ? (
                      <span>#{item.card_number}</span>
                    ) : null}
                  </p>
                  <p className="favourite__cardSet">{item.set_name}</p>
                  <p className="favourite__cardSet">{item.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else
      return (
        <div className="favourite_no_card">
          <span style={{ color: "white", fontSize: "20px", margin: "20px" }}>
            No cards found
          </span>
        </div>
      );
  }
  return (
    <>
      <Navbar user={user} check={check}
        setCheck={(val) => {
          setCheck(val);
        }}/>
      <div className="favourite">
        <div className="favourite_navspace"></div>
        <div className="favourite_header">
          <div className="favourite_heading">My Favourites</div>
        </div>
        <div className="favourite_list_container">
          {error ? (
            <>
              <div className="favourite__preloader__whole">
                <div className="favourite__error__message">
                  ERROR Loading Page
                  <br />
                  <br />
                  Please check the URL and reload again
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="favourite__ResultText">
                {totalCards && finalList ? <>Found {totalCards} cards</> : null}
              </div>
              <div className="favourite__card-container">
                <div className="favourite__row">
                  {finalList !== null ? (
                    <>{listItems()}</>
                  ) : (
                    <>
                      <div className="favourite__preloader__container">
                        <div className="favourite__preloader">
                          <div className="favourite__preloader">
                            <div className="favourite__preloader">
                              <div className="favourite__preloader">
                                <div className="favourite__preloader"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* <div>
                {totalCards ? (
                  <div className="favourite__page__container">
                    <Pagination
                      cardsPerPage={36}
                      totalcards={totalCards}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </div>
                ) : null}
              </div> */}
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Favourite;
