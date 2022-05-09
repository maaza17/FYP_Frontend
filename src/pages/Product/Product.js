import React, { useState, version } from "react";
import axios from "axios";
import "./Product.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import Favourite from "../../assets/favourite.png";
import UnFavourite from "../../assets/unfavourite.png";
import Snapshot from "../../components/Snapshot/Snapshot";
import Statistics from "../../components/Statistics/Statistics";
import Chart from "../../components/Chart/Chart";
import Analysis from "../../components/Analysis/Analysis";
import Navbar from "../../components/NavbarRest/NavbarRest";
import Footer from "../../components/Footer_FYP/FooterFYP";

export default function Product({ props, check, setCheck, user}) {
  const history = useHistory();
  const search = useLocation().search;
  const [error, setError] = React.useState(false);
  const [id, setId] = React.useState(new URLSearchParams(search).get("id"));
  const [cardNumber, setCardNumber] = React.useState(
    new URLSearchParams(search).get("cardNumber")
  );
  const [versionNumber, setVersionNumber] = React.useState(0);
  const [card, setcard] = React.useState(null);
  const [percentage, setpercentage] = React.useState(0);
  const [ratio, setratio] = React.useState(0);
  const [cardSales, setcardSales] = React.useState(null);
  const [latestSale, setLatestSale] = React.useState(null);
  const [lastSold, setLastSold] = React.useState(null);
  const [cardPopulation, setcardPopulation] = React.useState(undefined);
  const [allSales, setallSales] = React.useState([]);
  // const [user, setUser] = React.useState(null);
  const [isFavourite, setIsFavourite] = React.useState(null);
  const [FavouriteText, setFavouriteText] = useState("Add to Favorites");
  const token = null;
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

  const hasWindow = typeof window !== "undefined";
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width,
    }; 
  }

  React.useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  React.useEffect(() => {
    setId(new URLSearchParams(search).get("id"));
    setCardNumber(new URLSearchParams(search).get("cardNumber"));
  }, [window.location.pathname.split("/")]);

  React.useEffect(() => {
    if (!id && !cardNumber) {
      setError(true);
    }
  }, [id, cardNumber]);

  //USE EFFECT : On change of Card Number
  React.useEffect(() => {
    //Card API Call
    axios
      .post(
        "" + process.env.REACT_APP_BACKEND_URL + "api/cards/getOneCardByID",
        {
          cardid: id,
        }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          setcard(res.data.data);
          setVersionNumber(0);
        } else {
          console.log(res.data.message);
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [id]);

  //USE EFFECT : On change of Card Number
  React.useEffect(() => {
    //Sales API Call
    axios
      .post(
        "" +
          process.env.REACT_APP_BACKEND_URL +
          "api/sales/getAllSalesForOneCard",
        {
          card_id: cardNumber,
        }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          setcardSales(res.data.data);
          setLatestSale(res.data.data.lastmodified);
          setLastSold(res.data.latest);
          console.log(res.data);
        } else {
          console.log(res.data.message);
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
    //Population API Call
    axios
      .post(
        "" + process.env.REACT_APP_BACKEND_URL + "api/population/getPopulation",
        {
          card_id: cardNumber,
        }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          setcardPopulation(res.data.count[0]);
          // console.log(res.data.count[0])
        } else {
          console.log(res.data.message);
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [cardNumber]);

  //FUNCTION : Calculate Ratio and Percentage using Population
  const calculateRatio = () => {
    let output = 0;
    let a = 0;
    let b = 0;
    let result = 0.0;
    let tempRatio = 0.0;
    if (cardPopulation) {
      b = cardPopulation.psa_10;
      a = cardPopulation.psa_9;
      if (a > 0 && b > 0) {
        result = a / b;
        tempRatio = result.toFixed(2) + " : 1";
        output = (b / (b + a)) * 100;
        output = output.toFixed(1);
      } else if (b === 0 && a > 0) {
        tempRatio = "NO PSA 10";
        output = 0.0;
      } else if (b > 0 && a === 0) {
        tempRatio = a + " : " + b;
        output = 100;
      } else {
        tempRatio = "NO PSA 10";
        output = 0.0;
      }
      setpercentage(output);
      setratio(tempRatio);
    } else {
      setpercentage(0);
      setratio(0);
    }
    calculateGrade();
  };
  //FUNCTION : Calculate Grade using Percentage
  const calculateGrade = () => {
    if (percentage < 15) return "VERY HARD";
    else if (percentage >= 15 && percentage <= 30) return "HARD";
    else if (percentage >= 30 && percentage <= 50) return "MODERATE";
    else if (percentage >= 50 && percentage <= 70) return "EASY";
    else if (percentage > 70) return "VERY EASY";
  };
  //FUNCTION : Filter out needed Sales Data
  function salesdata() {
    if (cardSales) {
      let tempSales = [];
      let records = [];
      records = cardSales.grading_company;
      if (records) {
        if (records.psa) {
          for (var i = 0; i < records.psa.length; i++) {
            for (var j = 0; j < records.psa[i].length; j++) {
              let temp = records.psa[i][j];
              temp.date = temp.date.slice(0, 10).split("-").reverse().join("-");
              tempSales.push(temp);
            }
          }
        }
        if (records.bgs) {
          for (var m = 0; m < records.bgs.length; m++) {
            for (var n = 0; n < records.bgs[m].length; n++) {
              records.bgs[m][n].date = records.bgs[m][n].date
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-");
              tempSales.push(records.bgs[m][n]);
            }
          }
        }
        if (records.cgc) {
          for (var r = 0; r < records.cgc.length; r++) {
            for (var s = 0; s < records.cgc[r].length; s++) {
              records.cgc[r][s].date = records.cgc[r][s].date
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-");
              tempSales.push(records.cgc[r][s]);
            }
          }
        }
      }
      setallSales(tempSales);
    }
  }

  function handleFavClick() {
    if (isFavourite === true) {
      setIsFavourite(false);
      alert("Removed from Favorites");
      setFavouriteText("Add to Favorites");
    } else {
      setIsFavourite(true);
      console.log(user);
      alert("Added to Favourites");
      setFavouriteText("Added to Favorites");
    }
  }

  // USE EFFECT : On change of Fav
  React.useEffect(() => {
    if (isFavourite === true) {
      console.log("Add Favourites API");
      axios
        .post(
          "" + process.env.REACT_APP_BACKEND_URL + "api/user/addfavourite",
          {
            token: sessionStorage.getItem("token"),
            card_id: id,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } else if (isFavourite === false) {
      console.log("Remove Favourites API");
      axios
        .post(
          "" + process.env.REACT_APP_BACKEND_URL + "api/user/removefavourite",
          {
            token: sessionStorage.getItem("token"),
            card_id: id,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    }
  }, [isFavourite]);

  React.useEffect(() => {
    // USE EFFECT : Check if already Fav
    if(sessionStorage.getItem("token")){
    console.log("GetFavourites API");
    axios
      .post("" + process.env.REACT_APP_BACKEND_URL + "api/user/getfavourites", {
        token: sessionStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          let docs = res.data.data;
          console.log(docs);
          if (docs.length > 0) {
            let inFav = docs.find((f) => f._id === id);
            if (inFav) {
              setIsFavourite(true);
              setFavouriteText("Added to Favorite");
            }
          }
        } else {
          console.log(res.data.message);
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
    }
  }, []);

  // USE EFFECT : On change of Sale Data or Population
  React.useEffect(() => {
    calculateRatio();
  }, [cardPopulation]);

  // USE EFFECT : On change of Sale Data or Population
  React.useEffect(() => {
    salesdata();
  }, [cardSales]);

  if (error) {
    console.log(error);
    return (
      <>
        <Navbar user={user} check={check}
        setCheck={(val) => {
          setCheck(val);
        }}/>
        <div className="product__preloader__whole">
          <div className="product__error__message">
            ERROR Loading Page
            <br />
            <br />
            Please check the URL and reload again
          </div>
        </div>
      </>
    );
  } else if (card) {
    return (
      <>
        <Navbar user={user} check={check}
        setCheck={(val) => {
          setCheck(val);
        }}/>

        <div className="product">
          <div className="product__info">
            <div className="big-img">
              <img
                src={
                  card && card.sub_cat
                    ? card.sub_cat[versionNumber].image
                    : "https://tcg.bilalmohsin.com/static/media/empty.5eefa9c1.png"
                }
                alt="IMG"
                onError={(e) =>
                  (e.target.src =
                    "https://tcg.bilalmohsin.com/static/media/empty.5eefa9c1.png")
                }
              />
            </div>
            <div className="product__title__container">
              <div className="product__title">
                <h5>{card && card.name ? card.name : null}</h5>
                {user ? (
                  <button
                    className="favourite_box"
                    onClick={() => {
                      handleFavClick();
                    }}
                  >
                    <div className="favourite_text">{FavouriteText}</div>
                    {isFavourite ? (
                      <img
                        alt="back"
                        src={Favourite}
                        className="favourite_icon"
                      />
                    ) : (
                      <img
                        alt="back"
                        src={UnFavourite}
                        className="favourite_icon"
                      />
                    )}
                  </button>
                ) : null}
                <span>
                  {cardSales && latestSale
                    ? "Latest Update: " +
                      new Date(latestSale).toLocaleDateString("en-us", {
                        // weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : null}
                </span>
              </div>
              <div className="product_title_card_info">
                <span>
                  {card && card.set_name ? (
                    <>
                      {card.releaseYear} {card.set_name}{" "}
                      {card.card_number && card.card_number !== "Missing" ? (
                        <>#{card.card_number}</>
                      ) : null}{" "}
                      {card.language ? <span>({card.language})</span> : null}
                    </>
                  ) : null}
                </span>
              </div>

              {windowDimensions &&
              windowDimensions.width &&
              windowDimensions.width > 550 ? (
                <>
                  <div className="product__last__sold">
                    {cardSales && lastSold
                      ? "Last Sold: " +
                        new Date(lastSold).toLocaleDateString("en-us", {
                          // weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : null}
                  </div>
                </>
              ) : (
                <>
                  <div className="product__last__sold">
                    {cardSales && lastSold
                      ? "Last Sold: " +
                        new Date(lastSold).toLocaleDateString("en-us", {
                          // weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : null}
                  </div>
                  <div className="product__last__modified">
                    {cardSales && latestSale
                      ? "Latest Update: " +
                        new Date(latestSale).toLocaleDateString("en-us", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : null}
                  </div>
                </>
              )}
              <div className="version__container">
                <h4>Version Selected:</h4>
                <div className="versions">
                  {card && card.sub_cat
                    ? card.sub_cat.map((item) => {
                        if (item.card_id === cardNumber) {
                          return (
                            <Link
                              // to={`/product?id=${card._id}&cardNumber=${item.card_id}`}
                              className="version__selected"
                            >
                              {item.sub_category}
                            </Link>
                          );
                        } else {
                          return (
                            <>
                              {user ? (
                                <Link
                                  // to={`/product?id=${card._id}&cardNumber=${item.card_id}`}
                                  className="version"
                                  onClick={() => {
                                    if (cardPopulation && cardSales) {
                                      history.push(
                                        `/product?id=${card._id}&cardNumber=${item.card_id}`
                                      );
                                      setCardNumber(item.card_id);
                                      setpercentage(null);
                                      setcardSales(null);
                                      setcardPopulation(null);
                                      setVersionNumber(
                                        card.sub_cat.indexOf(item)
                                      );
                                    }
                                  }}
                                >
                                  {item.sub_category}
                                </Link>
                              ) : null}
                            </>
                          );
                        }
                      })
                    : null}
                </div>
                {!user ? (
                  <div className="token_versions">
                    Note: Must Login to see other versions of this card
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {windowDimensions &&
          windowDimensions.width &&
          windowDimensions.width > 960 ? (
            <>
              {cardPopulation ? (
                <div className="population__container">
                  <div className="population__section__9">
                    <div className="population__heading">
                      <p className="psa__heading__total">
                        PSA TOTAL POPULATION
                      </p>
                      <p className="psa__heading">PSA 10</p>
                      <p className="psa__heading">PSA 9</p>
                    </div>
                    <div className="population__values">
                      <p className="psa__heading__total">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_total}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_10}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_9}
                      </p>
                    </div>
                  </div>
                  <div className="population__ratio__grade">
                    <div className="population__heading__span">
                      <p className="psa__heading__ratio">PSA 9/10 RATIO</p>
                      <p className="psa__heading__chance">PSA 10 CHANCE</p>
                      <p className="psa__heading__grade">GRADE DIFFICULTY</p>
                    </div>
                    <div className="population__ratio__grade__values">
                      <p className="psa__heading__green">{ratio}</p>
                      <p className="psa__heading__green">{percentage}%</p>
                      <p className="psa__heading__green">
                        {cardPopulation === undefined ? null : calculateGrade()}
                      </p>
                    </div>
                  </div>
                  <div className="population__section">
                    <div className="population__heading">
                      <p className="psa__heading">PSA 8</p>
                      <p className="psa__heading">PSA 7</p>
                      <p className="psa__heading">PSA 6</p>
                      <p className="psa__heading">PSA 5</p>
                      <p className="psa__heading">PSA 4</p>
                      <p className="psa__heading">PSA 3</p>
                      <p className="psa__heading">PSA 2</p>
                      <p className="psa__heading">PSA 1</p>
                    </div>
                    <div className="population__values">
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_8}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_7}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_6}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_5}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_4}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_3}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_2}
                      </p>
                      <p className="psa__heading">
                        {cardPopulation === undefined
                          ? null
                          : cardPopulation.psa_1}
                      </p>
                    </div>
                  </div>
                </div>
              ) : cardPopulation ? (
                <div className="product__error__message2">
                  No Population Data Available
                </div>
              ) : (
                <div className="product__error__message">
                  Fetching Population Data...
                </div>
              )}
            </>
          ) : (
            <>
              {cardPopulation ? (
                <div className="population__container">
                  <div className="population__ratio__grade">
                    <div className="population__heading__span">
                      <p className="psa__heading__ratio">PSA 9/10 RATIO</p>
                      <p className="psa__heading__chance">PSA 10 CHANCE</p>
                      <p className="psa__heading__grade">GRADE DIFFICULTY</p>
                    </div>
                    <div className="population__ratio__grade__values">
                      <p className="psa__heading__green">{ratio}</p>
                      <p className="psa__heading__green">{percentage}%</p>
                      <p className="psa__heading__green">
                        {cardPopulation === undefined ? null : calculateGrade()}
                      </p>
                    </div>
                  </div>
                  <div className="population__section">
                    <div className="population__section__sub">
                      <div className="population__heading">
                        <p className="psa__heading__total">
                          PSA TOTAL POPULATION
                        </p>
                        <p className="psa__heading">PSA 10</p>
                        <p className="psa__heading">PSA 9</p>
                        <p className="psa__heading">PSA 8</p>
                        <p className="psa__heading">PSA 7</p>
                        <p className="psa__heading">PSA 6</p>
                        <p className="psa__heading">PSA 5</p>
                        <p className="psa__heading">PSA 4</p>
                        <p className="psa__heading">PSA 3</p>
                        <p className="psa__heading">PSA 2</p>
                        <p className="psa__heading">PSA 1</p>
                      </div>
                      <div className="population__values">
                        <div className="psa__heading__total psa__heading__givebackcolorfirst">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_total}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_10}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_9}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_8}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_7}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_6}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_5}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_4}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_3}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolor">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_2}
                        </div>
                        <div className="psa__heading psa__heading__givebackcolorlast">
                          {cardPopulation === undefined
                            ? null
                            : cardPopulation.psa_1}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : cardPopulation ? (
                <div className="product__error__message2">
                  No Population Data Available
                </div>
              ) : (
                <div className="product__error__message">
                  Fetching Population Data...
                </div>
              )}
            </>
          )}

          {cardSales ? (
            <Snapshot allSales={allSales} />
          ) : (
            <div className="product__error__message">
              Fetching Sales Data...
            </div>
          )}

          {cardSales ? (
            <div className="chart__container">
              <Chart user={user} allSales={allSales} />
            </div>
          ) : null}
          {cardSales ? (
            <div className="statistics__header">
              (2019 - 2022) Overall Sales Statistics
            </div>
          ) : null}

          {cardSales ? <Statistics company="PSA" allSales={allSales} /> : null}
          {cardSales ? <Statistics company="CGC" allSales={allSales} /> : null}
          {cardSales ? <Statistics company="BGS" allSales={allSales} /> : null}

          <div style={{ display: "none" }}>
            <Statistics company="BGS" allSales={[]} />
          </div>
          {cardSales ? <Analysis user={user} allSales={allSales} /> : null}
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar user={user} check={check}
        setCheck={(val) => {
          setCheck(val);
        }}/>
        <div className="product__preloader__whole">
          <div className="product__preloader__container">
            <div className="product__preloader">
              <div className="product__preloader">
                <div className="product__preloader">
                  <div className="product__preloader">
                    <div className="product__preloader"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
