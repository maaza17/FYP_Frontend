import React from "react";
import axios from "axios";
import popData from "../data/population.json";
import "./Product/Product.css";
// import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Snapshot from "../components/Snapshot/Snapshot";
import Statistics from "../components/Statistics/Statistics";
import Search from "../components/Search/Search";
import Chart from "../components/Chart/Chart";
import Analysis from "../components/Analysis/Analysis";

export default function Product(props) {
  const [id, setid] = React.useState(null);
  const [cardNumber, setcardNumber] = React.useState(null);
  const [card, setcard] = React.useState(null);
  const [percentage, setpercentage] = React.useState(0);
  const [ratio, setratio] = React.useState(0);
  const [cardSales, setcardSales] = React.useState(null);
  const [cardPopulation, setcardPopulation] = React.useState(popData);
  const [allSales, setallSales] = React.useState([]);

  //USE EFFECT : On change of URL
  React.useEffect(() => {
    setid(props.match.params.id);
    setcardNumber(props.match.params.cardNumber);
  }, [props.match.params]);

  //USE EFFECT : On change of ID or Card Number
  React.useEffect(() => {
    //Card API Call
    axios
      .post("http://localhost:7000/api/cards/getOneCardByID", {
        cardid: id,
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          setcard(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //Sales API Call
    axios
      .post("http://localhost:7000/api/sales/getAllSalesForOneCard", {
        card_id: cardNumber,
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          setcardSales(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //Population API Call
    axios
      .post("http://localhost:7000/api/population/getPopulation", {
        card_id: cardNumber,
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // setcardPopulation(res.data.data);
          // console.log(res.data)
          setcardPopulation(popData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, cardNumber]);

  //FUNCTION : Calculate Ratio and Percentage using Population
  const calculateRatio = () => {
    let output = 0;
    let a = 0;
    let b = 0;
    let result = 0.0;
    let tempRatio = 0.0;
    if (cardPopulation.psa_10 >= cardPopulation.psa_9) {
      a = cardPopulation.psa_10;
      b = cardPopulation.psa_9;
      result = a / b;
      tempRatio = "1 : " + result.toFixed(2);
      output = (a / (a + b)) * 100;
    } else {
      b = cardPopulation.psa_10;
      a = cardPopulation.psa_9;
      result = a / b;
      tempRatio = result.toFixed(2) + " : " + "1";
      output = (b / (b + a)) * 100;
    }
    setpercentage(output.toFixed(1));
    setratio(tempRatio);
    // return ;
  };
  //FUNCTION : Calculate Grade using Percentage
  const calculateGrade = () => {
    if (percentage < 15) return "HARD";
    else if (percentage >= 15 && percentage <= 50) return "MODERATE";
    else if (percentage > 50) return "EASY";
  };
  //FUNCTION : Filter out needed Sales Data
  function salesdata() {
    if (cardSales) {
      let tempSales = []
      let records = cardSales.grading_company;
      for (var i = 0; i < records.psa.length; i++) {
        for (var j = 0; j < records.psa[i].length; j++) {
          tempSales.push(records.psa[i][j]);
        }
      }
      for (var m = 0; m < records.bgs.length; m++) {
        for (var n = 0; n < records.bgs[m].length; n++) {
          tempSales.push(records.bgs[m][n]);
        }
      }
      for (var r = 0; r < records.cgc.length; r++) {
        for (var s = 0; s < records.cgc[r].length; s++) {
          tempSales.push(records.cgc[r][s]);
        }
      }
      setallSales(tempSales);
    }
  }
  //USE EFFECT : On change of Sale Data or Population
  React.useEffect(() => {
    salesdata();
    calculateRatio();
  }, [cardSales]);
  return (
    <>
      {/* <Navbar page="other" search="hide" /> */}
      <div className="search-main">
        <Search />
      </div>
      <div className="product">
        <div className="product__info">
          <div className="big-img">
            <img
              src={card && card.sub_cat ? card.sub_cat[0].image : null}
              alt="IMG"
            />
          </div>
          <div className="product__title__container">
            <div className="product__title">
              <h5>{card && card.name ? card.name : "loading..."}</h5>
              <span>Last Update: 2021/08/27 </span>
            </div>
            <p>{card && card.set_name ? card.set_name : "loading..."}</p>
            <div className="version__container">
              <h4>Version Selected:</h4>
              <div className="versions">
                {card && card.sub_cat
                  ? card.sub_cat.map((item) => {
                      if (item.card_id === cardNumber) {
                        return (
                          <Link
                            to={`../${id}/${item.card_id}`}
                            className="version__selected"
                          >
                            {item.sub_category}
                          </Link>
                        );
                      } else {
                        return (
                          <Link
                            to={`../${id}/${item.card_id}`}
                            className="version"
                          >
                            {item.sub_category}
                          </Link>
                        );
                      }
                    })
                  : "loading..."}
              </div>
            </div>
          </div>
        </div>
        <div className="population__container">
          <div className="population__section__9">
            <div className="population__heading">
              <p className="psa__heading__total">PSA TOTAL POPULATION</p>
              <p className="psa__heading">PSA 10</p>
              <p className="psa__heading">PSA 9</p>
            </div>
            <div className="population__values">
              <p className="psa__heading__total">{cardPopulation.psa_total}</p>
              <p className="psa__heading">{cardPopulation.psa_10}</p>
              <p className="psa__heading">{cardPopulation.psa_9}</p>
            </div>
          </div>
          <div className="population__ratio__grade">
            <div className="population__heading__span">
              <p className="psa__heading__ratio">PSA 9/10 RATIO</p>
              <p className="psa__heading__grade">GRADE DIFFICULTY</p>
            </div>
            <div className="population__ratio__grade__values">
              <p className="psa__heading__green">
                {ratio}({percentage}%)
              </p>
              <p className="psa__heading__green">{calculateGrade()}</p>
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
              <p className="psa__heading">{cardPopulation.psa_8}</p>
              <p className="psa__heading">{cardPopulation.psa_7}</p>
              <p className="psa__heading">{cardPopulation.psa_6}</p>
              <p className="psa__heading">{cardPopulation.psa_5}</p>
              <p className="psa__heading">{cardPopulation.psa_4}</p>
              <p className="psa__heading">{cardPopulation.psa_3}</p>
              <p className="psa__heading">{cardPopulation.psa_2}</p>
              <p className="psa__heading">{cardPopulation.psa_1}</p>
            </div>
          </div>
        </div>

        {cardSales ? <Snapshot allSales={allSales} /> : "loading..."}
        {/* Space left for Chart Component */}
        <div className="chart__container">
          <Chart />
        </div>
        {cardSales ? <Statistics company="PSA" allSales={allSales} /> : "loading..."}
        {cardSales ? <Statistics company="CGC" allSales={allSales} /> : "loading..."}
        {cardSales ? <Statistics company="BGS" allSales={allSales} /> : "loading..."}
        {/* The below component is NOT to be removed. It takes zero processing power but essential for system to end*/}
        <div style={{ display: "none" }}>
          <Statistics company="BGS" allSales={[]} />
        </div>
        {cardSales ? <Analysis /> : "loading..."}
      </div>
    </>
  );
}
