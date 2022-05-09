import React, { Component, useState } from "react";
import "./Product.css";
import jsonData from "../data/Ampharos.json";
import salesData from "../data/Sales.json";
// import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import LatestSales from "../components/LatestSales/LatestSales";
import Snapshot from "../components/Snapshot/Snapshot";
import Statistics from "../components/Statistics/Statistics";
import Search from "../components/Search/Search";
import Chart from "../components/Chart/Chart";
import Analysis from "../components/Analysis/Analysis";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      cardNumber: null,
      card: "",
      percentage: "",
      cardSales: "",
    };
  }
  render() {
    const urlarr = this.props.match.url.split("/");
    this.state.id = urlarr[urlarr.length - 2];
    this.state.cardNumber = this.props.match.params.cardNumber;
    // console.log(this.state.cardNumber);
    // console.log(this.state.id);
    const data = jsonData.find((i) => i._id == this.state.id); //correction
    const subarr = data.sub_category;
    // console.log(subarr);
    this.state.card = subarr.find((j) => j.cardNumber == this.state.cardNumber);
    // console.log(this.state.card);
    this.state.cardSales = salesData.filter(
      (salesData) => salesData._id === this.state.cardNumber
    );
    // console.log(this.state.cardSales);

    const calculateRatio = () => {
      let a = 0;
      let b = 0;
      let result = 0.0;
      let ratio = 0.0;
      if (this.state.card.psa_10 >= this.state.card.psa_9) {
        a = this.state.card.psa_10;
        b = this.state.card.psa_9;
        result = a / b;
        ratio = "1 : " + result.toFixed(2);
        this.state.percentage = (a / (a + b)) * 100;
      } else {
        b = this.state.card.psa_10;
        a = this.state.card.psa_9;
        result = a / b;
        ratio = result.toFixed(2) + " : " + "1";
        this.state.percentage = (b / (b + a)) * 100;
      }
      //correction

      // console.log(result + "---" + this.state.percentage + "---" + ratio);
      return ratio + " (" + this.state.percentage.toFixed(1) + "%)";
    };
    const calculateGrade = () => {
      if (this.state.percentage < 15) return "HARD";
      else if (this.state.percentage >= 15 && this.state.percentage <= 50)
        return "MODERATE";
      else if (this.state.percentage > 50) return "EASY";
    };
    // console.log(this.state.cardSales);

    let allSales = [];
    //   console.log(records);
    const records = this.state.cardSales[0].grading_company;
    // console.log(records);
    const salesdata = () => {
      for (var i = 0; i < records.psa.length; i++) {
        for (var j = 0; j < records.psa[i].length; j++) {
          allSales.push(records.psa[i][j]);
        }
      }
      for (var m = 0; m < records.bgs.length; m++) {
        for (var n = 0; n < records.bgs[m].length; n++) {
          allSales.push(records.bgs[m][n]);
        }
      }
      for (var r = 0; r < records.cgc.length; r++) {
        for (var s = 0; s < records.cgc[r].length; s++) {
          allSales.push(records.cgc[r][s]);
        }
      }
      return allSales;
    };
    allSales = salesdata();
    return (
      <>
        {/* <Navbar page="other" search="hide" /> */}
        <div className="search-main">
          <Search />
        </div>
        <div className="product">
          <div className="product__info">
            <div className="big-img">
              <img src={this.state.card.thumb} alt="IMG" />
            </div>
            <div className="product__title__container">
              <div className="product__title">
                <h5>{data.product_name + " #" + data.card_id}</h5>
                <span>Last Update: 2021/08/27 </span>
              </div>
              <p>{data.set_name}</p>
              {/* <Link className="same__set" to="/">
                {"Search for other cards in the same set >"}
              </Link> */}
              <div className="version__container">
                <h4>Version Selected:</h4>
                <div className="versions">
                  {data.sub_category.map((item) => {
                    console.log(this.state.cardNumber);
                    console.log(item.cardNumber);
                    if (item.cardNumber == this.state.cardNumber) {
                      console.log("This" + item.cardNumber);
                      return (
                        <Link
                          to={`../${this.state.id}/${item.cardNumber}`}
                          className="version__selected"
                        >
                          {item.sub_category}
                        </Link>
                      );
                    } else {
                      return (
                        <Link
                          to={`../${this.state.id}/${item.cardNumber}`}
                          className="version"
                        >
                          {item.sub_category}
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            {/* <LatestSales allSales={allSales} /> */}
          </div>
          <div className="population__container">
            <div className="population__section__9">
              <div className="population__heading">
                <p className="psa__heading__total">PSA TOTAL POPULATION</p>
                <p className="psa__heading">PSA 10</p>
                <p className="psa__heading">PSA 9</p>
              </div>
              <div className="population__values">
                <p className="psa__heading__total">
                  {this.state.card.psa_total}
                </p>
                <p className="psa__heading">{this.state.card.psa_10}</p>
                <p className="psa__heading">{this.state.card.psa_9}</p>
              </div>
            </div>
            <div className="population__ratio__grade">
              <div className="population__heading__span">
                <p className="psa__heading__ratio">PSA 9/10 RATIO</p>
                <p className="psa__heading__grade">GRADE DIFFICULTY</p>
              </div>
              <div className="population__ratio__grade__values">
                <p className="psa__heading__green">{calculateRatio()}</p>
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
                <p className="psa__heading">{this.state.card.psa_8}</p>
                <p className="psa__heading">{this.state.card.psa_7}</p>
                <p className="psa__heading">{this.state.card.psa_6}</p>
                <p className="psa__heading">{this.state.card.psa_5}</p>
                <p className="psa__heading">{this.state.card.psa_4}</p>
                <p className="psa__heading">{this.state.card.psa_3}</p>
                <p className="psa__heading">{this.state.card.psa_2}</p>
                <p className="psa__heading">{this.state.card.psa_1}</p>
              </div>
            </div>
          </div>

          <Snapshot allSales={allSales} />
          {/* Space left for Chart Component */}
          <div className="chart__container">
            <Chart />
          </div>
          <Statistics company="PSA" allSales={allSales} />
          <Statistics company="CGC" allSales={allSales} />
          <Statistics company="BGS" allSales={allSales} />
          {/* The below component is NOT to be removed. It takes zero processing power but essential for system to end*/}
          <div style={{ display: "none" }}>
            <Statistics company="BGS" allSales={[]} />
          </div>
          <Analysis />
        </div>
      </>
    );
  }
}

export default Product;
