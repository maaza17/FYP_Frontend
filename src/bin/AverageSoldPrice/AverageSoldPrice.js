import React, { useState } from "react";
import CatDropdown from "../../components/CatDropdown/CatDropdown";
import "./AverageSoldPrice.css";
import dailyData from "../../data/Market/aspDailyInfo.json";
import weeklyData from "../../data/Market/aspWeeklyInfo.json";
import monthlyData from "../../data/Market/aspMonthlyInfo.json";

function AverageSoldPrice() {
  const [selected, setSelected] = useState("Pokémon TCG");

  const posNeg = (value) => {
    if (value >= 0) {
      return <p className="asp__data__value">+{value}%</p>;
    } else {
      return <p className="asp__data__value__n">-{value}%</p>;
    }
  };
  return (
    <div className="average__sold__price">
      <div className="asp__box">
        <div className="asp__heading__area">
          <h3 className="asp__heading">Average Sold Price</h3>
          <span className="asp__description">
            <p>Unlock one of the most important benchmarks.</p>
            <p>(This indicator is very sensitive. Use with Caution.)</p>
          </span>
          <span className="asp__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span>
        </div>
        <div className="asp__graph__area"></div>
      </div>
      <div className="asp__table__box">
        <div className="asp__daily__info">
          <div className="asp__daily__info__heading">
            <div>Daily Information</div>
          </div>
          <div className="asp__daily__info__header">
            <p className="asp__dih__date">Date</p>
            <p className="asp__dih__ap">Average Price</p>
            <p className="asp__dih__pc">Percentage Change</p>
          </div>
          <div className="asp__data">
            {dailyData.slice(0, 4).map((item) => {
              return (
                <>
                  <div className="asp__data__row">
                    <p className="asp__data__date">{item.date}</p>
                    <p className="asp__data__ap">${item.averagePrice}</p>
                    <p className="asp__data__pc">
                      {posNeg(item.percentageChange)}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <div className="asp__fl">
            <div className="asp__fl__link">Full List {">>"}</div>
          </div>
        </div>
        <div className="asp__weekly__info">
          <div className="asp__weekly__info__heading">
            <div>Weekly Information</div>
          </div>
          <div className="asp__weekly__info__header">
            <p className="asp__wih__w">Week</p>
            <p className="asp__wih__ap">Average Price</p>
            <p className="asp__wih__pc">Percentage Change</p>
          </div>
          <div className="asp__data">
            {weeklyData.slice(0, 4).map((item) => {
              return (
                <>
                  <div className="asp__data__row">
                    <p className="asp__data__date">{item.week}</p>
                    <p className="asp__data__ap">${item.averagePrice}</p>
                    <p className="asp__data__pc">
                      {posNeg(item.percentageChange)}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <div className="asp__fl">
            <div className="asp__fl__link">Full List {">>"}</div>
          </div>
        </div>
        <div className="asp__monthly__info">
          <div className="asp__monthly__info__heading">
            <div>Monthly Information</div>
          </div>
          <div className="asp__monthly__info__header">
            <p className="asp__mih__m">Month</p>
            <p className="asp__mih__ap">Average Price</p>
            <p className="asp__mih__pc">Percentage Change</p>
          </div>
          <div className="asp__data">
            {monthlyData.slice(0, 4).map((item) => {
              return (
                <>
                  <div className="asp__data__row">
                    <p className="asp__data__date">{item.month}</p>
                    <p className="asp__data__ap">${item.averagePrice}</p>
                    <p className="asp__data__pc">
                      {posNeg(item.percentageChange)}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <div className="asp__fl">
            <div className="asp__fl__link">Full List {">>"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AverageSoldPrice;
