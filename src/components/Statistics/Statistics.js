import React, { useState } from "react";
import "./Statistics.css";

function Statistics({ company, allSales }) {
  //console.log(allSales);
  // const options = [
  //   { id: "1", days: 31, value: "1 month" },
  //   { id: "2", days: 92, value: "3 months" },
  //   { id: "3", days: 183, value: "6 months" },
  //   { id: "4", days: 365, value: "1 year" },
  //   { id: "5", days: 999, value: "All time" },
  // ];
  const [select, setselect] = useState(999);
  //console.log(select);
  const changeSelection = (num) => {
    setselect(num);
  };

  //Data Work
  const companySales = allSales.filter((item) => item.company === company);
  let comSales = [];
  let cSales = [];
  comSales = companySales.sort(function (a, b) {
    return a.sold - b.sold;
  });

  // //console.log(sortedPrice);
  cSales = comSales.sort(
    (a, b) =>
      new Date(...b.date.split("-").reverse().join("")) -
      new Date(...a.date.split("-").reverse().join(""))
  );

  // //console.log(cSales);
  let DateFilterSales = [];
  if (select == 999) {
    DateFilterSales = cSales;
  } else {
    let current = new Date();
    current.setDate(current.getDate() - select);
    let date;
    if (current.getMonth() + 1 < 10) {
      let year = current.getFullYear() + "";
      year = year.slice(2, year.length);
      date = `${current.getDate()}-0${current.getMonth() + 1}-${year}`;
    } else {
      let year = current.getFullYear() + "";
      year = year.slice(2, year.length);
      date = `${current.getDate()}-${current.getMonth() + 1}-${year}`;
    }

    // date = date.slice(0, date.length-2);
    DateFilterSales = cSales.filter(
      (item) =>
        item.date.split("-").reverse().join("") >
        date.split("-").reverse().join("")
    );
  }
  if (company === "BGS") {
    //console.log(DateFilterSales);
  }
  const grades = [];
  for (var i = 10; i >= 1; i = i - 0.5) {
    grades.push(i);
  }

  const statsScroll = () => {
    return (
      <>
        {grades.map((item) => {
          // //console.log(item);

          const sales = DateFilterSales.filter((t) => t.grade === item);
          while (sales.length > 0) {
            return (
              <>
                <div className="stats__box__row">
                  <p className="stats__box__heading">{item}</p>
                  <p className="stats__box__volume">{calculateVolume(item)}</p>
                  <p className="stats__box__lastsold">
                    {calculateLastSold(item)}
                  </p>
                  <p className="stats__box__date">
                    {calculateLastDate(item)}
                  </p>
                  <p className="stats__box__heading__avg">
                    {calculateAvg3(item)}
                  </p>
                </div>
              </>
            );
          }
        })}
      </>
    );
  };

  const calculateVolume = (grade) => {
    // //console.log(grade);
    const sales = DateFilterSales.filter((item) => item.grade === grade);
    if (sales.length > 0) {
      return sales.length;
    } else return "- - - -";
  };

  const calculateLastSold = (grade) => {
    const sales = DateFilterSales.filter((item) => item.grade === grade);
    if (sales.length > 0) {
      let sortedSales = sales.sort(
        (a, b) =>
          new Date(...b.date.split("-").reverse()) -
          new Date(...a.date.split("-").reverse())
      );
      //   //console.log(sortedSales);
      return "$" + sortedSales[0].sold;
    } else return "- - - -";
  };

  const calculateLastDate = (grade) => {
    const sales = DateFilterSales.filter((item) => item.grade === grade);
    if (sales.length > 0) {
      let sortedSales = sales.sort(
        (a, b) =>
          new Date(...b.date.split("-").reverse()) -
          new Date(...a.date.split("-").reverse())
      );
      // //console.log(sortedSales);
      return sortedSales[0].date;
    } else return "- - - -";
  };

  const calculateAvg3 = (grade) => {
    const sales = DateFilterSales.filter((item) => item.grade === grade);
    let sum = 0.0;
    let average = 0.0;
    let sortedSales = "";
    if (sales.length > 0) {
      sortedSales = sales.sort(
        (a, b) =>
          new Date(...b.date.split("-").reverse()) -
          new Date(...a.date.split("-").reverse())
      );
      if (sortedSales.length === 1) return "$" + sortedSales[0].sold.toFixed(2);
      else if (sortedSales.length === 2) {
        sum = sortedSales[0].sold + sortedSales[1].sold;
        average = sum / 2;
        return "$" + average.toFixed(2);
      } else if (sortedSales.length > 2) {
        sum = sortedSales[0].sold + sortedSales[1].sold + sortedSales[2].sold;
        average = sum / 3;
        return "$" + average.toFixed(2);
      }
    } else return "- - - -";
  };

  const percentageReturn = () => {
    const integers = [];
    for (var j = 10; j >= 1; j = j - 0.5) {
      integers.push(j);
    }
    const value = (grade) => {
      let value = 0;
      const sales = DateFilterSales.filter((item) => item.grade === grade);
      let sortedSales = "";
      let sortedPrice = "";
      if (sales.length > 0) {
        sortedPrice = sales.sort(function (a, b) {
          return b.sold - a.sold;
        });
        // //console.log(sortedPrice);
        sortedSales = sortedPrice.sort(
          (a, b) =>
            new Date(...b.date.split("-").reverse()) -
            new Date(...a.date.split("-").reverse())
        );
        let diff =
          sortedSales[0].sold - sortedSales[sortedSales.length - 1].sold;
        value = (diff / sortedSales[0].sold) * 100;
        if (value >= 0)
          return <p className="value__green">{value.toFixed(0)}%</p>;
        else return <p className="value__red">{value.toFixed(0)}%</p>;
      } else return <p className="value">- - - -</p>;
    };
    return (
      <>
        {integers.map((item) => {
          // console.log(item);
          return (
            <>
              <div className="p__r__by__grade">
                <p className="heading">{company + " " + item}</p>
                {value(item)}
              </div>
            </>
          );
        })}
      </>
    );
  };

  const companyHeading = () => {
    if (company === "PSA")
      return (
        <div className="stats__heading">
          <div className="stats__heading__psa">{company}</div>
        </div>
      );
    else if (company === "CGC")
      return (
        <div className="stats__heading">
          <div className="stats__heading__cgc">{company}</div>
        </div>
      );
    else if (company === "BGS")
      return (
        <div className="stats__heading">
          <div className="stats__heading__bgs">{company}</div>
        </div>
      );
  };

  return (
    // <div className="statistics">
    <div className="stats__section">
      <div className="stats__container">
        {companyHeading()}
        <div className="stats__box">
          {(DateFilterSales.length > 0) ? <>
            <div className="stats__box__headings">
              <p className="stats__box__heading">Grade</p>
              <p className="stats__box__heading">Volume</p>
              <p className="stats__box__heading">Last Sold</p>
              <p className="stats__box__date">Date</p>
              <p className="stats__box__heading__avg">{"Avg { Past 3 Sold }"}</p>
            </div>
            <div className="stats__box__scroll__wrapper">{statsScroll()}</div>
          </>
            : <div className="stats__box__error">No Data Available</div >}</div>
      </div>
    </div>

    // </div>
  );
}

export default Statistics;
