import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Shop.css";
import empty from "../../assets/images/empty.png";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import CheckBoxSet from "../../components/CheckBox/CheckBoxSet";
import Navbar from "../../components/NavbarRest/NavbarRest";
import Footer from "../../components/Footer_FYP/FooterFYP";

function Shop({props, user, check, setCheck}) {
  //Variables XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const history = useHistory();
  const search = useLocation().search;
  const [error, setError] = React.useState(false);
  const [searchField, setsearchField] = React.useState(new URLSearchParams(search).get('q'));
  const [tempsearchField, settempsearchField] = React.useState(new URLSearchParams(search).get('q'));
  const [allSets, setallSets] = React.useState(null);
  const [setFilters, setsetFilters] = React.useState((new URLSearchParams(search).get('sets')) ? new URLSearchParams(search).get('sets').split(",") : []);
  const [nameSortASC, setnameSortASC] = React.useState(((new URLSearchParams(search).get('n')) && (new URLSearchParams(search).get('n') === "true")) ? true : false);
  const [japan, setjapan] = React.useState(((new URLSearchParams(search).get('j')) && (new URLSearchParams(search).get('j') === "false")) ? false : true);
  const [english, setenglish] = React.useState(((new URLSearchParams(search).get('e')) && (new URLSearchParams(search).get('e') === "false")) ? false : true);
  const [dateSort, setdateSort] = React.useState(((new URLSearchParams(search).get('d')) && (new URLSearchParams(search).get('d') === "true")) ? true : false);
  const [popularity, setPopularity] = React.useState(((new URLSearchParams(search).get('p')) && (new URLSearchParams(search).get('p') === "false")) ? false : true);
  const [finalList, setfinalList] = React.useState(null);
  const [showSets, setshowSets] = React.useState(false);
  const [refresh, setrefresh] = React.useState(false);
  const [currentPage, setcurrentPage] = React.useState(((new URLSearchParams(search).get('pag'))) ? parseInt(new URLSearchParams(search).get('pag')) : 1);
  const [totalCards, settotalCards] = React.useState(null);
  const [first, setFirst] = React.useState(true);

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

  //Get From Link XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  React.useEffect(() => {
    setsearchField((new URLSearchParams(search).get('q')) ? new URLSearchParams(search).get('q') : "")
  }, [new URLSearchParams(search).get('q')])
  React.useEffect(() => {
    setsetFilters((new URLSearchParams(search).get('sets')) ? new URLSearchParams(search).get('sets').split(",") : [])
  }, [new URLSearchParams(search).get('sets')])
  React.useEffect(() => {
    setnameSortASC(((new URLSearchParams(search).get('n')) && (new URLSearchParams(search).get('n') === "true")) ? true : false);
  }, [new URLSearchParams(search).get('n')])
  React.useEffect(() => {
    setjapan(((new URLSearchParams(search).get('j')) && (new URLSearchParams(search).get('j') === "false")) ? false : true);
  }, [new URLSearchParams(search).get('j')])
  React.useEffect(() => {
    setenglish(((new URLSearchParams(search).get('e')) && (new URLSearchParams(search).get('e') === "false")) ? false : true)
  }, [new URLSearchParams(search).get('e')])
  React.useEffect(() => {
    setPopularity(((new URLSearchParams(search).get('p')) && (new URLSearchParams(search).get('p') === "false")) ? false : true)
  }, [new URLSearchParams(search).get('p')])
  React.useEffect(() => {
    setdateSort(((new URLSearchParams(search).get('d')) && (new URLSearchParams(search).get('d') === "true")) ? true : false)
  }, [new URLSearchParams(search).get('d')])
  React.useEffect(() => {
    setcurrentPage(((new URLSearchParams(search).get('pag'))) ? parseInt(new URLSearchParams(search).get('pag')) : 1)
    // console.log(parseInt(new URLSearchParams(search).get('pag')));
  }, [new URLSearchParams(search).get('pag')])


  //Search Field
  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (tempsearchField !== null && !first) {
        history.push("/search?q=" + tempsearchField + "&sets=" + setFilters + "&j=" + japan + "&e=" + english + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
      }
    }, 700);
    return () => clearTimeout(timeOutId);
  }, [tempsearchField]);


  //Calls XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //Card API Call
  React.useEffect(() => {
    if (error) setError(false)
    setfinalList(null);
    let NS = 0;
    let DS = 0;
    let PS = 0;
    if (nameSortASC) NS = 1;
    if (dateSort) DS = 1;
    if (popularity) PS = 1;
    console.log("START");
    console.log(nameSortASC);
    console.log(dateSort);
    console.log(popularity);
    console.log(searchField);
    console.log(setFilters);
    console.log(japan);
    console.log(english);
    console.log(currentPage);
    console.log("END");
    axios
      .post(
        "" + process.env.REACT_APP_BACKEND_URL + "api/cards/searchshop",
        // "http://localhost:7000/api/cards/searchshop",
        {
          query: searchField,
          setname: setFilters,
          nameSort: NS,
          japan: japan,
          english: english,
          popularity: PS,
          dateSort: DS,
          paginate: currentPage - 1,
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.message);
          setError(true)
        } else {
          settotalCards(res.data.count);
          setfinalList(res.data.data);
          setFirst(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true)
      });
  }, [setFilters, popularity, nameSortASC, dateSort, searchField, currentPage, refresh, english, japan]);

  //Sets API Call
  React.useEffect(() => {
    axios
      .get(
        "" + process.env.REACT_APP_BACKEND_URL + "api/cards/getAllSets"
        // "http://localhost:7000/api/cards/getAllSets",
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.message);
        } else {
          setallSets(res.data.data);
        }
      })
      .catch((err) => {
        setError(true)
        console.log(err);
      });
  }, []);


  //Listing XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  //Listing Cards
  function listItems() {
    if (finalList.length > 0) {
      return finalList.map((item) => {
        return (
          <div className="shop__card">
            <div key={item.id}>
              <Link to={`/product?id=${item._id}&cardNumber=${item.sub_cat[0].card_id}`}>
                <img
                  className="shop__card_img"
                  src={item.sub_cat[0].image}
                  onError={(e) => (e.target.src = empty)}
                  alt="IMG"
                />
              </Link>
              <div className="shop__cardInfo">
                <div className="shop__cardText">
                  <p className="shop__cardName">
                    {item.name}{" "}
                    {((item.card_number) && (item.card_number !== "Missing")) ? (
                      <span>#{item.card_number}</span>
                    ) : null}
                  </p>
                  <p className="shop__cardSet">{item.set_name}</p>
                  <p className="shop__cardSet">{item.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>
        )
      });
    } else
      return (
        <span style={{ color: "white", fontSize: "20px", margin: "20px" }}>
          No cards found
        </span>
      );
  }

  //Listing Sets
  function listSets() {
    if (setFilters.length > 0) {
      return (
        <div className="shop__selected__sets__bar">
          {setFilters.map((item) => (
            <div className="shop__selected__sets__bar__oneItem">
              <div className="atEnds">
                {item}
                <i
                  onClick={() => { changeSets(item); }}
                  style={{ fontSize: "15px", color: "white", cursor: "pointer", marginLeft: "10px", padding: "0" }}
                  class="fa fa-times">
                </i>
              </div>
            </div>
          ))}
        </div>
      );
    } else return null;
  }

  //Functions XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Changing Sets
  function changeSets(item) {
    let temp = setFilters;
    let num = temp.indexOf(item);
    if (num !== -1) {
      temp.splice(num, 1);
    } else {
      temp.push(item);
    }
    history.push("/search?q=" + searchField + "&sets=" + temp + "&j=" + japan + "&e=" + english + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
    setrefresh(!refresh);
  }

  //PAGINATION MATERIAL
  const paginate = (pageNumber) => {
    history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + japan + "&e=" + english + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + pageNumber)
    window.scrollTo(0, 0);
  };

  //Return XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  //Return Page
  return (
    <div className="shop">
      <Navbar user={user} check={check}
        setCheck={(val) => {
          setCheck(val);
        }}/>
      <div className="shop__shop">
        <div className="shop__search-main">
          <input
            id="shop_search_input"
            type="search"
            className="shop__shop__search"
            placeholder="Search"
            value={tempsearchField}
            onChange={(e) => {
              settempsearchField(e.target.value);
            }}
          />
          <div className="shop__OneBigBox__filter__sets atEnds" onClick={() => { setshowSets(!showSets); }}>
            <h3>Filter by Sets</h3>

            {showSets ? (null) : (
              <i
                onClick={() => { setshowSets(true); }}
                style={{ fontSize: "20px", color: "white", marginRight: "5px", padding: "0" }}
                class="fa fa-angle-down fa-1x">
              </i>
            )}
            {showSets ? (
              <>
                <div className="set__list__container">
                  <div className="set__list">
                    <CheckBoxSet
                      hideSets={() => {
                        setshowSets(false);
                      }}
                      setFilters={setFilters}
                      allSets={allSets}
                      changeSets={(item) => {
                        changeSets(item);
                      }}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="shop__OneBigBox">
            <h2>Sort by</h2>
            <div className="shop__OneBox">
              <div className="shop__Box">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + japan + "&e=" + english + "&n=" + !nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
                  }}
                  defaultChecked={nameSortASC}
                />
              </div>
              <span>Name</span>
            </div>
            <div className="shop__OneBox">
              <div className="shop__Box">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + japan + "&e=" + english + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + !dateSort + "&pag=" + 1)

                  }}
                  defaultChecked={dateSort}
                />
              </div>
              <span>Release Year</span>
            </div>
            <div className="shop__OneBox">
              <div className="shop__Box">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + japan + "&e=" + english + "&n=" + nameSortASC + "&p=" + !popularity + "&d=" + dateSort + "&pag=" + 1)
                  }}
                  defaultChecked={popularity}
                />
              </div>
              <span>Popularity</span>
            </div>
          </div>
          <div className="shop__filter__bigbox">
            <h2>Filter</h2>
            <div
              className="shop__filter__box"
              onClick={() => {
                var newjap = !japan;
                if (newjap) history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + newjap + "&e=" + english + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
                else {
                  if (!english) history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + newjap + "&e=" + true + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
                  else history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + newjap + "&e=" + english + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
                }
              }}
              style={(japan) ? { backgroundColor: "grey", cursor: "default" } : {}}
            >
              {(japan) ?
                <span>
                  <span style={{ backgroundColor: "#0b151f", border: "1px solid #1a3a5c", borderRadius: "50px", padding: "0px 2.5px", margin: "0px 5px 0px 2px", cursor: "pointer" }} >X</span>
                  <span>Japanese</span>
                </span>
                :
                <span>Japanese</span>
              }
            </div>
            <div
              onClick={() => {
                var neweng = !english;
                if (neweng) history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + japan + "&e=" + neweng + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
                else {
                  if (!japan) history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + true + "&e=" + neweng + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
                  else history.push("/search?q=" + searchField + "&sets=" + setFilters + "&j=" + japan + "&e=" + neweng + "&n=" + nameSortASC + "&p=" + popularity + "&d=" + dateSort + "&pag=" + 1)
                }
              }}
              className="shop__filter__box"
              style={(english) ? { backgroundColor: "grey", cursor: "default" } : {}}
            >
              {(english) ?
                <span>
                  <span style={{ backgroundColor: "#0b151f", border: "1px solid #1a3a5c", borderRadius: "50px", padding: "0px 2.5px", margin: "0px 5px 0px 2px", cursor: "pointer" }} >X</span>
                  <span>English</span>
                </span>
                :
                <span>English</span>
              }
            </div>
          </div>
        </div>
        {listSets()}
        <div className="shop__Main">
          <div className="shop__right_side">
            {(error) ? <>
              <div className="shop__preloader__whole">
                <div className="shop__error__message">
                  ERROR Loading Page<br /><br />
                  Please check the URL and reload again
                </div>
              </div>
            </> : <>
              <div className="shop__ResultText">
                {totalCards && finalList ? <>Found {totalCards} cards</> : null}
              </div>
              <div className="shop__card-container">
                <div className="shop__row">
                  {finalList !== null ? (
                    <>{listItems()}</>
                  ) : (
                    <>
                      <div className="shop__preloader__container">
                        <div className="shop__preloader">
                          <div className="shop__preloader">
                            <div className="shop__preloader">
                              <div className="shop__preloader">
                                <div className="shop__preloader">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                {/* PAGINATION */}
                {totalCards ? (
                  <div className="shop__page__container">
                    <Pagination
                      cardsPerPage={36}
                      totalcards={totalCards}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </div>
                ) : null}
              </div>
            </>}
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default Shop;
