import React from "react";
import "./LatestSales.css";

function LatestSales({ allSales }) {
  //   console.log(records.psa);
  //   console.log(allSales);

  let sortedSales = allSales.sort(
    (a, b) =>
      new Date(...b.date.split("-").reverse()) -
      new Date(...a.date.split("-").reverse())
  );
  sortedSales = sortedSales.slice(0, 5);

  //   console.log(sortedSales);
  return (
    <div className="latest__sales">
      <h5>LATEST SALES</h5>
      <div className="sales">
        {sortedSales.map((item) => {
          return (
            <div className="sale__row">
              <p className="sale__date">{item.date}</p>
              <p className="sale__company__grade">
                {item.company + " " + item.grade}
              </p>
              <p className="sale__price">${item.sold}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestSales;
