import React, { useState} from "react";
import axios from "axios";
import "./AverageSalesPrice.css";
import CanvasJSReact from "../../../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AverageSalesPrice() {

  const [averageSalesPrice, setAverageSalesPrice] = useState([]);
  React.useEffect(() => {
    axios
      .get(
        "" +
          process.env.REACT_APP_BACKEND_URL +
          // "http://localhost:7000/"+
          "api/market/getms1"
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // setcardPopulation(res.data.data);
          // console.log(res.data.count);
           let temp = res.data.count;
          for (var j = 0; j < temp.length; j++) {
            temp[j].date = temp[j].date
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-");
          }
          setAverageSalesPrice(temp);
          // console.log(temp);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  // console.log(averageSalesPrice);

  const dataPointsJapAvgPrice = () => {
    const dataPointsJapAP = [];
    averageSalesPrice.map((item) => {
      const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        const properDate = new Date(year, month - 1, day);
        return properDate;
      };
      dataPointsJapAP.push({
        x: toDate(item.date),
        y: parseInt(item.japanese),
      });
    });
    return dataPointsJapAP;
  };
  const dataPointsEngAvgPrice = () => {
    const dataPointsEngAP = [];
    averageSalesPrice.map((item) => {
      const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        const properDate = new Date(year, month - 1, day);
        return properDate;
      };
      dataPointsEngAP.push({
        x: toDate(item.date),
        y: parseInt(item.english),
      });
    });
    // console.log(dataPointsEngAP);
    return dataPointsEngAP;
  };
  const colors = CanvasJS.addColorSet("revenueColorSet", [
    "#2277c0",
    "#F6BA02",
  ]);
  const options = {
    colorSet: "revenueColorSet",
    animationEnabled: true,
    animationDuration: 2000,
    // height: 300,
    // width: 1090,
    backgroundColor: "#08131f",
    theme: "none",
    title: {
      text: "Sales Revenue(USD)",
      fontColor: "white",
      fontSize: 15,
      // fontStyle: "bold",
      fontFamily: "Roboto",
      horizontalAlign: "left",
      padding: 20,
      // height: 600,
    },
    axisX: {
      margin: 10,
      padding: {
        top: 10,
      },
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      labelFontColor: "#fff",
      tickLength: 20,
      tickColor: "#08131F",
      lineColor: "#365C9E",
      lineThickness: 1,
      valueFormatString: "YY MMM DD",
    },
    axisY: {
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      margin: 10,
      labelFontColor: "#fff",
      includesZero: true,
      valueFormatString: "$#,###,###.##",
      tickLength: 20,
      minimum: 0,
      maximum: 500,
      tickColor: "#08131F",
      lineThickness: 6,
      lineColor: "#08131F",
    },
    toolTip: {
      content:
        "{name}:<br/> Date: <strong>{x}</strong><br/>Average Price: <strong>${y}</strong>",
    },
    legend: {
      cursor: "pointer",
      fontColor: "#fff",
      // horizontalAlign: "left",
      maxWidth: 600,
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: 16,
      itemWidth: 200,
      markerMargin: 10,
      itemclick: function (e) {
        //   console.log("legend click: " + e.dataPointIndex);
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: "spline",
        markerType: "circle", //"circle", "square", "cross", "none"
        legendMarkerType: "circle",
        legendMarkerBorderThickness: 11,
        legendMarkerColor: "#2277c0",
        legendMarkerBorderColor: "#2277c0",
        markerSize: 1,
        showInLegend: true,
        name: "English Average Price",
        dataPoints: dataPointsEngAvgPrice(),
      },
      {
        type: "spline",
        markerType: "circle", //"circle", "square", "cross", "none"
        legendMarkerType: "circle",
        legendMarkerBorderThickness: 11,
        legendMarkerColor: "#F6BA02",
        legendMarkerBorderColor: "#F6BA02",
        markerSize: 1,
        showInLegend: true,
        name: "Japanese Average Price",
        dataPoints: dataPointsJapAvgPrice(),
      },
    ],
  };
  return (
    <div className="revenue__volume">
      <div className="box">
        <div className="heading__area">
          <h3 className="rv__heading">Average Sales Price</h3>
          <span className="rv__description">
            <p>Track the overall market movement.</p>
            <p>This is a good indicator of the market direction.</p>
          </span>
          {/* <span className="rv__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="graph__area">
          <div className="chart__background">
            <div className="revenue__chart">
              <CanvasJSChart
                options={options}
                /* onRef={ref => this.chart = ref} */
              />
              {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="table__box">
        <div className="daily__info">
          <div className="daily__info__heading">
            <div>Daily Information</div>
          </div>
          <div className="daily__info__header">
            <p className="dih__date">Date</p>
            <p className="dih__sv">Sales Volume</p>
            <p className="dih__pc">Percentage Change</p>
            <p className="dih__sr">Sales Revenue</p>
            <p className="dih__pc2">Percentage Change</p>
          </div>
          <div className="rv__data">
            {dailyData.slice(0, 4).map((item) => {
              return (
                <>
                  <div className="rv__data__row">
                    <p className="rv__data__date">{item.date}</p>
                    <p className="rv__data__sv">${item.salesVolume}</p>
                    <p className="rv__data__pc">
                      {posNeg(item.svPercentageChange)}
                    </p>
                    <p className="rv__data__sr">$ {item.salesRevenue}</p>
                    <p className="rv__data__pc">
                      {posNeg(item.srPercentageChange)}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <div className="rv__fl">
            <div className="rv__fl__link">Full List {">>"}</div>
          </div>
        </div>
        <div className="weekly__info">
          <div className="weekly__info__heading">
            <div>Weekly Information (1 month)</div>
          </div>
          <div className="weekly__info__header">
            <p className="wih__ws">Week Start</p>
            <p className="wih__sv">Sales Volume</p>
            <p className="wih__pc">Percentage Change</p>
            <p className="wih__sr">Sales Revenue</p>
            <p className="wih__pc2">Percentage Change</p>
          </div>
          <div className="rv__data">
            {weeklyData.slice(0, 4).map((item) => {
              return (
                <>
                  <div className="rv__data__row">
                    <p className="rv__data__date">{item.weekStart}</p>
                    <p className="rv__data__sv">${item.salesVolume}</p>
                    <p className="rv__data__pc">
                      {posNeg(item.svPercentageChange)}
                    </p>
                    <p className="rv__data__sr">$ {item.salesRevenue}</p>
                    <p className="rv__data__pc">
                      {posNeg(item.srPercentageChange)}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <div className="rv__fl">
            <div className="rv__fl__link">Full List {">>"}</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AverageSalesPrice;
