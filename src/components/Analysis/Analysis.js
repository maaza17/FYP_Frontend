import React from "react";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import DoughnutChartMobile from "../DoughnutChartMobile/DoughnutChartMobile";
import "./Analysis.css";

function Analysis({ allSales, user }) {
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
  const psaSales = allSales.filter((item) => item.company === "PSA");
  const bgsSales = allSales.filter((item) => item.company === "BGS");
  const cgcSales = allSales.filter((item) => item.company === "CGC");

  const psaVolume = psaSales.length;
  const bgsVolume = bgsSales.length;
  const cgcVolume = cgcSales.length;

  // console.log(allSales);
  // console.log(psaSales);
  // console.log(bgsSales);
  // console.log(cgcSales);

  // console.log(psaVolume);
  // console.log(bgsVolume);
  // console.log(cgcVolume);

  const calculateVolume = (company) => {
    // //console.log(grade);
    const sales = allSales.filter((item) => item.company === company);
      return sales.length;
  };

  const calculateAverage = (company) => {
    const total = allSales.length;
    const volume = calculateVolume(company);
    if (volume !== 0){
      const avg = (volume / total) * 100;
      return (avg.toFixed(2));
    }
    else {
      return 0
    }
  };

  return (
    <div className="analysis">
      <div className="sales__volume__distribution__container">
        {user ? (
          <>
        <h5 className="svd__heading">
        (2019 - 2022) Sales Volume Distribution by Grading Company
        </h5>
        <div className="svd__info__container">
          <div className="svd__legend">
            <div className="svd__legend__company">
              <div className="svd__legend__psa__button"></div>
              <div className="svd__legend__info">
                <div className="svd__legend__cards">
                  PSA Cards:{" "}
                  <span style={{ color: "#92D050" }}>
                    {calculateAverage("PSA")+"%"}
                  </span>
                </div>
                <div className="svd__legend__total">
                  Total: {calculateVolume("PSA")}
                </div>
              </div>
            </div>
            <div className="svd__legend__company">
              <div className="svd__legend__bgs__button"></div>
              <div className="svd__legend__info">
                <div className="svd__legend__cards">
                  BGS Cards:{" "}
                  <span style={{ color: "#B4C7E7" }}>
                    {calculateAverage("BGS")+"%"}
                  </span>
                </div>
                <div className="svd__legend__total">
                  Total: {calculateVolume("BGS")}
                </div>
              </div>
            </div>
            <div className="svd__legend__company">
              <div className="svd__legend__cgc__button"></div>
              <div className="svd__legend__info">
                <div className="svd__legend__cards">
                  CGC Cards:{" "}
                  <span style={{ color: "#BF9000" }}>
                    {calculateAverage("CGC")+"%"}
                  </span>
                </div>
                <div className="svd__legend__total">
                  Total: {calculateVolume("CGC")}
                </div>
              </div>
            </div>
          </div>
          {windowDimensions &&
          windowDimensions.width &&
          windowDimensions.width > 550 ? 
            <>
          <div className="svd__pie__chart">
            <DoughnutChart
              psa={calculateAverage("PSA")}
              bgs={calculateAverage("BGS")}
              cgc={calculateAverage("CGC")}
            />
          </div>
          </> : <>
          <div className="svd__pie__chart">
            <DoughnutChartMobile
              psa={calculateAverage("PSA")}
              bgs={calculateAverage("BGS")}
              cgc={calculateAverage("CGC")}
            />
          </div>
          </>}
        </div>
        </>
        ) : (
          <div className="analysis_image_container">
            <div className="analysis_image"></div>
            <div className="analysis_image_text">Please Login to see this Chart.</div>
          </div>
        ) }
      </div>
    </div>
  );
}

export default Analysis;
