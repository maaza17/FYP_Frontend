import React, { useState, useEffect } from "react";
import "./HomeChart.css";
import axios from "axios";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function HomeChart() {
  const [averageRevenue, setAverageRevenue] = useState([]);
  const [shortAverageRevenue, setShortAverageRevenue] = useState([]);
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
    if (hasWindow && window.location.pathname === "/") {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  function getFontSize() {
    const width = hasWindow ? window.innerWidth : null;
    let ans = width - width * 0.97;
    if (ans > 20) {
      return 20;
    }
    if (ans < 15) {
      return 15;
    } else return ans;
  }

  function getThickness() {
    if (
      windowDimensions &&
      windowDimensions.width &&
      windowDimensions.width < 800
    )
      return 1;
    else return 2;
  }

  function toDate(dateStr) {
    const [day, month, year] = dateStr.split("-");
    const properDate = new Date(year, month - 1, day);
    return properDate;
  }

  function getDataWithDates(date, data, num) {
    var maxdate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + num - 1
    );
    return data.filter((item) => {
      if (toDate(item.date) >= date && toDate(item.date) <= maxdate)
        return item;
    });
  }

  React.useEffect(() => {
    axios
      .get("" + process.env.REACT_APP_BACKEND_URL + "api/market/getms1")
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // setcardPopulation(res.data.data);
          // //console.log(res.data.count);
          let temp = res.data.count;
          for (var j = 0; j < temp.length; j++) {
            temp[j].date = temp[j].date
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-");
          }
          setAverageRevenue(temp);
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (averageRevenue && averageRevenue.length > 0) {
      if (windowDimensions.width < 600) {
        var num = 7;
        var start = toDate(averageRevenue[0].date);
        var end = toDate(averageRevenue[averageRevenue.length - 1].date);
        var temp = [];
        for (var d = start; d <= end; d.setDate(d.getDate() + num)) {
          temp.push(getDataWithDates(d, averageRevenue, num));
        }
        var final = [];
        for (var i = 0; i < temp.length; i++) {
          var toProcess = temp[i];
          var engVal = 0;
          var jpnVal = 0;
          for (var j = 0; j < toProcess.length; j++) {
            engVal = engVal + toProcess[j].english;
            jpnVal = jpnVal + toProcess[j].japanese;
          }
          var out = {
            date: toProcess[0].date,
            english: engVal / toProcess.length,
            japanese: jpnVal / toProcess.length,
          };
          final.push(out);
        }
        setShortAverageRevenue(final);
      } else setShortAverageRevenue(averageRevenue);
    } else setShortAverageRevenue([]);
  }, [averageRevenue, windowDimensions.width]);

  const dataPointsJap = () => {
    const datapointsJap = [];
    shortAverageRevenue.map((item) => {
      // const toDate = (dateStr) => {
      //   const [day, month, year] = dateStr.split("-");
      //   const properDate = new Date(year, month - 1, day);
      //   return properDate;
      // };
      datapointsJap.push({
        x: toDate(item.date),
        y: parseInt(item.japanese),
      });
    });
    //console.log(shortAverageRevenue);
    //console.log("dpJap");
    //console.log(datapointsJap);
    return datapointsJap;
  };
  const dataPointsEng = () => {
    const dataPointsEng = [];
    shortAverageRevenue.map((item) => {
      // const toDate = (dateStr) => {
      //   const [day, month, year] = dateStr.split("-");
      //   const properDate = new Date(year, month - 1, day);
      //   return properDate;
      // };
      // //console.log(item);
      dataPointsEng.push({
        x: toDate(item.date),
        y: parseInt(item.english),
      });
    });
    //console.log("dpEng");
    //console.log(dataPointsEng);
    return dataPointsEng;
  };
  const colors = CanvasJS.addColorSet("homecolorSet", ["#2277c0", "#E0645A"]);
  const options = {
    colorSet: "homecolorSet",
    animationEnabled: true,
    animationDuration: 2000,
    // width: getWindowWidth(),
    // height: getWindowHeight(),
    backgroundColor: "#08131f",
    theme: "none",
    title: {
      text: "Pokemon TCG Daily Average Sold Price",
      fontColor: "white",
      fontSize: getFontSize(),
      fontStyle: "bold",
      fontFamily: "Roboto",
      horizontalAlign: "center",
      // padding: 5
    },
    axisX: {
      margin: 5,
      scaleBreaks: {
        autoCalculate: true,
      },
      // padding: {
      //   top: 10,
      // },
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      labelFontColor: "#fff",
      // tickLength: getFontSize(),
      tickColor: "#08131F",
      lineColor: "#365C9E",
      // lineThickness: getLineSize(),
      valueFormatString: "YY MMM DD",
    },
    axisY: {
      scaleBreaks: {
        autoCalculate: true,
      },
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      // margin: 0,
      labelFontColor: "#fff",
      includesZero: true,
      valueFormatString: "$#,###,###.##",
      // tickLength: getFontSize(),
      // minimum: 0,
      // maximum: 500,
      tickColor: "#08131F",
      // lineThickness: getLineSize(),
      lineColor: "#08131F",
    },
    toolTip: {
      content:
        "{name}:<br/>Date: <strong>{x}</strong><br/>Average Price: <strong>${y}</strong>",
    },
    legend: {
      cursor: "pointer",
      fontColor: "#fff",
      verticalAlign: "top",
      // maxWidth: getWindowWidth(),
      fontFamily: "Roboto",
      fontWeight: "light",
      // horizontalAlign:"",
      // fontSize: getSmallerFontSize(),
      itemWidth: 200,
      // markerMargin: getFontSize(),
      itemclick: function (e) {
        //   //console.log("legend click: " + e.dataPointIndex);
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
        lineThickness: getThickness(),
        type: "spline",
        markerType: "circle", //"circle", "square", "cross", "none"
        markerSize: 0,
        showInLegend: true,
        name: "English Daily Average",
        dataPoints: dataPointsEng(),
      },
      {
        lineThickness: getThickness(),
        type: "spline",
        markerType: "circle", //"circle", "square", "cross", "none"
        markerSize: 0,
        showInLegend: true,
        name: "Japanese Daily Average",
        dataPoints: dataPointsJap(),
      },
    ],
  };
  const Moboptions = {
    colorSet: "homecolorSet",
    animationEnabled: true,
    animationDuration: 2000,
    // width: getWindowWidth(),
    height: 220,
    backgroundColor: "#08131f",
    theme: "none",
    title: {
      text: "Pokemon TCG Daily Average Sold Price",
      fontColor: "white",
      fontSize: 14,
      fontStyle: "bold",
      fontFamily: "Roboto",
      horizontalAlign: "center",
      // padding: 5
    },
    axisX: {
      margin: 5,
      scaleBreaks: {
        autoCalculate: true,
      },
      // padding: {
      //   top: 10,
      // },
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      labelFontColor: "#fff",
      labelFontSize: 8,
      // tickLength: getFontSize(),
      tickColor: "#08131F",
      lineColor: "#365C9E",
      // lineThickness: getLineSize(),
      valueFormatString: "MMM 'YY",
    },
    axisY: {
      scaleBreaks: {
        autoCalculate: true,
      },
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      // margin: 0,
      labelFontColor: "#fff",
      labelFontSize: 9,
      includesZero: true,
      valueFormatString: "$#,###,###.##",
      // tickLength: getFontSize(),
      // minimum: 0,
      // maximum: 500,
      tickColor: "#08131F",
      // lineThickness: getLineSize(),
      lineColor: "#08131F",
    },
    toolTip: {
      content:
        "{name}:<br/>Date: <strong>{x}</strong><br/>Average Price: <strong>${y}</strong>",
    },
    legend: {
      cursor: "pointer",
      fontColor: "#fff",
      verticalAlign: "top",
      // maxWidth: getWindowWidth(),
      fontFamily: "Roboto",
      fontWeight: "light",
      // horizontalAlign:"",
      // fontSize: getSmallerFontSize(),
      itemWidth: 200,
      // markerMargin: getFontSize(),
      itemclick: function (e) {
        //   //console.log("legend click: " + e.dataPointIndex);
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
        lineThickness: getThickness(),
        type: "spline",
        markerType: "circle", //"circle", "square", "cross", "none"
        markerSize: 0,
        showInLegend: true,
        name: "English Daily Average",
        dataPoints: dataPointsEng(),
      },
      {
        lineThickness: getThickness(),
        type: "spline",
        markerType: "circle", //"circle", "square", "cross", "none"
        markerSize: 0,
        showInLegend: true,
        name: "Japanese Daily Average",
        dataPoints: dataPointsJap(),
      },
    ],
  };
  return (
    <div className="homeChart">
      {
        windowDimensions &&
        windowDimensions.width &&
        windowDimensions.width > 650 ? (
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
        ) : (
          <CanvasJSChart
            options={Moboptions}
            /* onRef={ref => this.chart = ref} */
          />
        )
        /*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/
      }
    </div>
  );
}
