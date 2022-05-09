import React, { useState } from "react";
import axios from "axios";
import CatDropdown from "../../../CatDropdown/CatDropdown";
import "./SalesVolumeByGC.css";
import data from "../../../../data/Market/svgc__weekly__info.json";
import CanvasJSReact from "../../../../assets/canvasjs.react";
import ListingComponent from "../../../ListingComponent/ListingComponent";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function SalesVolumeByGC() {
  const [selected, setSelected] = useState("Pokémon TCG");
  const [weeklyInfo, setWeeklyInfo] = useState([]);
  const [barData, setBarData] = useState([]);
  const [dData, setDData] = useState([]);
  const [show, setshow] = useState(false);
  const [columnMax,setcolumnMax] = React.useState(100);
  React.useEffect(() => {
    axios
      .get("" + process.env.REACT_APP_BACKEND_URL + "api/market/getms5table")
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          let temp = res.data.count;
          for (var j = 0; j < temp.length; j++) {
            temp[j].week_time = temp[j].week_time
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-");
          }
          setWeeklyInfo(temp);
          // console.log(temp);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("" + process.env.REACT_APP_BACKEND_URL + "api/market/getms5bar")
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          let temp = res.data.count;
          let max = columnMax;
          for (var j = 0; j < temp.length; j++) {
            temp[j].date = temp[j].date
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-");
              if(temp[j].count>max) {
                max=temp[j].count;
              }
          }
          setcolumnMax(max);
          setBarData(temp);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("" + process.env.REACT_APP_BACKEND_URL + "api/market/getms5doughnut")
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          let temp = res.data.count[0];
          // for (var j = 0; j < temp.length; j++) {
          //   temp[j].date = temp[j].date
          //     .slice(0, 10)
          //     .split("-")
          //     .reverse()
          //     .join("-");
          // }
          setDData(temp);
          // console.log(weeklyInfo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(dData);

  const psaBar = barData.filter(
    (item) => item.grading_company === "Graded by PSA"
  );
  const cgcBar = barData.filter(
    (item) => item.grading_company === "Graded by CGC"
  );
  const bgsBar = barData.filter(
    (item) => item.grading_company === "Graded by BGS"
  );

  // console.log(psaBar);
  // console.log(cgcBar);
  // console.log(bgsBar);

  const psaBarChart = () => {
    const psadp = [];
    psaBar.map((item) => {
      const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        const properDate = new Date(20 + year, month - 1, day);
        return properDate;
      };
      psadp.push({
        y: parseInt(item.count),
        x: toDate(item.date),
      });
    });
    // console.log(psadp);
    return psadp;
  };

  const bgsBarChart = () => {
    const bgsdp = [];
    bgsBar.map((item) => {
      const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        const properDate = new Date(20 + year, month - 1, day);
        return properDate;
      };
      bgsdp.push({
        y: parseInt(item.count),
        x: toDate(item.date),
      });
    });
    // console.log(bgsdp);
    return bgsdp;
  };

  const cgcBarChart = () => {
    const cgcdp = [];
    cgcBar.map((item) => {
      const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        const properDate = new Date(20 + year, month - 1, day);
        return properDate;
      };
      cgcdp.push({
        y: parseInt(item.count),
        x: toDate(item.date),
      });
    });
    // console.log(cgcdp);
    return cgcdp;
  };

  const colors = CanvasJS.addColorSet("svgccolorSet", ["#2277c0", "#E0645A"]);
  const options = {
    colorSet: "svgccolorSet",
    animationEnabled: true,
    animationDuration: 2000,
    dataPointWidth: 15,
    // height: 450,
    // width: 1090,
    backgroundColor: "#0F0F0F",
    theme: "none",
    title: {
      text: "Sales Volume (#)",
      fontColor: "white",
      fontSize: 16,
      // fontStyle: "bold",
      fontFamily: "Roboto",
      horizontalAlign: "left",
      padding: 20,
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
      tickColor: "#0F0F0F",
      lineColor: "#0F0F0F",
      lineThickness: 1,
      valueFormatString: "MM/DD",
    },
    axisY: {
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      margin: 20,
      labelFontColor: "#fff",
      // includesZero: false,
      valueFormatString: "#,###,###.##",
      tickLength: 20,
      minimum: 0,
      maximum: columnMax,
      tickColor: "#0F0F0F",
      lineThickness: 6,
      lineColor: "#0F0F0F",
    },
    toolTip: {
      content:
        "{name}:<br/>Date: <strong>{x}</strong><br/>Value: <strong>{y}</strong>",
    },
    legend: {
      cursor: "pointer",
      fontColor: "#fff",
      // verticalAlign: "top",
      maxWidth: 600,
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: 16,
      itemWidth: 80,
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
        type: "column",
        bevelEnabled: true,
        legendMarkerType: "circle",
        showInLegend: true,
        name: "CGC",
        color: "#4472C4",
        dataPoints: cgcBarChart(),
      },
      {
        type: "column",
        bevelEnabled: true,
        legendMarkerType: "circle",
        showInLegend: true,
        name: "PSA",
        color: "#70AD47",
        dataPoints: psaBarChart(),
      },
      {
        type: "column",
        showInLegend: true,
        legendMarkerType: "circle",
        bevelEnabled: true,
        name: "BGS",
        color: "#FFC000",
        dataPoints: bgsBarChart(),
      },
    ],
  };
  const dcolors = CanvasJS.addColorSet("dcolorSet", [
    "#17A35A",
    "#2278C1",
    "#DC9F29",
  ]);
  const dataPoints = () => {
    // console.log(dData);
    if (dData) {
      const dp = [];
      let sum = 0;
      sum = dData.psa + dData.cgc + dData.bgs;
      // console.log(sum);
      // console.log(dData["psa"]);
      dp.push({
        name: "Graded by PSA",
        y: (dData.psa / sum) * 100,
        exploded:true
        // y: 69,
      });
      dp.push({
        name: "Graded by BGS",
        y: (dData.bgs / sum) * 100,
        // y: 8,
      });
      dp.push({
        name: "Graded by CGC",
        y: (dData.cgc / sum) * 100,
        // y: 23,
      });

      return dp;
    } else return [];
  };
  const doptions = {
    animationEnabled: true,
    animationDuration: 2000,
    backgroundColor: "#0F0F0F",
    colorSet: "dcolorSet",
    theme: "dark1",
    height: 250,
    axisY: {
      includesZero: true, //try changing it to true
    },
    subtitles: [
      {
        // verticalAlign: "center",
        fontSize: 10,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: false,
        indexLabel: "{name}: {y}",
        indexLabelFontSize: 9,
        yValueFormatString: "(##.##'%)'",
        horizontalAlign: "center",
        startAngle: -90,
        radius: "100%",
        innerRadius: "60%",
        dataPoints: dataPoints(),
      },
    ],
  };
  return (
    <div className="sales__volume__by__GC">
      <ListingComponent
        data={weeklyInfo}
        show={show}
        setShow={(b) => { setshow(b) }}
        order={[{ name: "week_time", displayName: "Weekly" }, { name: "sales_vol", displayName: "Sales Volume" }, { name: "psa_perc", displayName: "PSA Percentage",type:"percentage" }, { name: "cgc_perc", displayName: "CGC Percentage",type:"percentage" }, { name: "bgs_perc", displayName: "BGS Percentage",type:"percentage" }]}
      />
      <div className="svgc__box">
        <div className="svgc__heading__area">
          <h3 className="svgc__heading">
            Sales Volume Organized <br /> by Grading Companies
          </h3>
          <span className="svgc__description">
            <p>Reveal the favourable choice in the hobby.</p>
            <p>(As of Feb 2022, Only Includes BGS, CGC and PSA)</p>
          </span>
          {/* <span className="svgc__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="svgc__graph__area">
          <div className="svgc__chart">
            <CanvasJSChart
              options={options}
            /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
        </div>
      </div>
      <div className="svgc__table__box">
        <div className="svgc__pie__graph">
          <div className="svgc__pie__graph__heading">
            <div>Past 90 Days Summary</div>
          </div>
          <div className="svgc__doughnut">
            <div className="svgc__dchart">
              <CanvasJSChart options={doptions} />
              {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
            <div className="svgc__legend__section">
              <div className="svgc__legends__row">
                <div className="legend">
                  <div className="svgc__legend__r1"></div>
                  <div className="svgc__legend__r1__char">
                    {/* {dData.length > 0 ? dData[0].character : null} */}Graded by PSA
                  </div>
                </div>
                <div className="legend">
                  <div className="svgc__legend__r2"></div>
                  <div className="svgc__legend__r2__char">
                    {/* {dData.length > 0 ? dData[1].character : null} */}Graded by BGS
                  </div>
                </div>
                <div className="legend">
                  <div className="svgc__legend__r3"></div>
                  <div className="svgc__legend__r3__char">
                    {/* {dData.length > 0 ? dData[2].character : null} */}Graded by CGC
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="svgc__weekly__info">
          <div className="svgc__weekly__info__heading">
            <div>Weekly Information</div>
          </div>
          <div className="svgc__weekly__info__header">
            <p className="svgc__wih__w">Weekly</p>
            <p className="svgc__wih__sv">Sales Volume</p>
            <p className="svgc__wih__psap">PSA Percentage</p>
            <p className="svgc__wih__cgcp">CGC Percentage</p>
            <p className="svgc__wih__bgsp">BGS Percentage</p>
          </div>
          <div className="svgc__wih__data">
            {weeklyInfo.slice(0, 5).map((item) => {
              return (
                <>
                  <div className="svgc__data__row">
                    <p className="svgc__data__w">{item.week_time}</p>
                    <p className="svgc__data__sv">{item.sales_vol}</p>
                    <p className="svgc__data__psap">
                      {item.psa_perc.toFixed(2)}%
                    </p>
                    <p className="svgc__data__cgcp">
                      {item.cgc_perc.toFixed(2)}%
                    </p>
                    <p className="svgc__data__bgsp">
                      {item.bgs_perc.toFixed(2)}%
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <div className="svgc__fl">
            <div className="svgc__fl__link" onClick={()=>{setshow(true)}}>Full List {">>"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesVolumeByGC;
