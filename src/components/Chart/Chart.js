//IMPORT
import React, { useState } from "react";
import styled from "styled-components";
import "./Chart.css";
import CanvasJSReact from "../../assets/canvasjs.react";
import { round } from "lodash";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart({ allSales , user}) {
  //USE STATE VARIABLES
  const hasWindow = typeof window !== "undefined";
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );
  const [company, setCompany] = useState("PSA");
  const [time, setTime] = useState("ALL");
  const [cSales, setCSales] = React.useState();
  const [AvgSales, setAvgSales] = React.useState([]);
  const [TimeRangeSales, setTimeRangeSales] = React.useState([]);
  const [grades, setGrades] = React.useState([10, 9, 8]);
  const [gradesAvailable, setGradesAvailable] = React.useState([]);
  const [refresh, setRefresh] = React.useState(true);
  const [recal, setrecal] = React.useState(true);
  const [maxSale, setMaxSale] = React.useState(1000);
  // //console.log(allSales);
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //CHILD CALL TO ASYNC FUNCTION
  async function getFromAll() {
    setCSales(() => allSales.filter((item) => item.company === company));
    if(!user){
      setTime("3M");
    }
  }

  async function GetTimeRangeSales() {
    let temp = [];
    if (time === "ALL") {
      temp = cSales;
    } else {
      let timespan;
      if (time === "3M") timespan = 92;
      else if (time === "6M") timespan = 183;
      else if (time === "1Y") timespan = 365;
      else if (time === "2Y") timespan = 730;
      let current = new Date();
      current.setDate(current.getDate() - timespan);
      let date;
      let month = "";
      let days = "";
      if (current.getMonth() < 9) {
        month = "0" + (current.getMonth() + 1);
      } else {
        month = current.getMonth() + 1;
      }
      if (current.getDate() < 10) {
        days = "0" + current.getDate();
      } else {
        days = current.getDate();
      }
      let year = current.getFullYear() + "";
      date = `${days}-${month}-${year}`;
      temp = cSales.filter(
        (item) =>
          item.date.split("-").reverse().join("") >
          date.split("-").reverse().join("")
      );
    }
    // //console.log(temp);
    if (temp.length === 0) {
      setTimeRangeSales([]);
    } else {
      setTimeRangeSales(temp);
    }
  }

  async function GetAvgSales() {
    let temp = [];
    let prev = null;
    let sum = 0;
    let count = 0;
    TimeRangeSales.map((item) => {
      if (prev === null) {
        prev = item;
        count = 1;
        sum = item.sold;
      } else {
        if (prev.date === item.date && prev.grade === item.grade) {
          sum = sum + item.sold;
          count = count + 1;
        } else {
          prev.sold = sum / count;
          temp.push(prev);
          prev = item;
          sum = item.sold;
          count = 1;
          if (TimeRangeSales.indexOf(item) === TimeRangeSales.length - 1) {
            temp.push(prev);
          }
        }
      }
    });
    // //console.log(temp);
    if (temp.length < 1) {
      // //console.log("im here")
      setAvgSales([]);
    } else {
      setAvgSales(temp);
    }
  }

  async function getAvailable() {
    let temp = [];
    TimeRangeSales.map((item) => {
      if (temp.indexOf(item.grade) === -1) {
        // //console.log(item.grade)
        temp.push(item.grade);
      }
    });
    if (recal) {
      setrecal(false);
      if (temp.length > 4)
        setGrades(
          temp
            .sort(function (a, b) {
              return b - a;
            })
            .slice(0, 4)
        );
      else
        setGrades(
          temp
            .sort(function (a, b) {
              return b - a;
            })
            .slice(0, temp.length)
        );
    }
    setGradesAvailable(temp);
  }

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //PARENT CALL TO ASYNC FUNCTION
  async function getTimeData() {
    if (cSales !== undefined && cSales.length > 1) {
      await GetTimeRangeSales();
    } else {
      setTimeRangeSales([]);
    }
  }

  async function getAvgData() {
    if (TimeRangeSales !== undefined && TimeRangeSales.length > 1) {
      await GetAvgSales();
      await getAvailable();
    } else {
      setAvgSales([]);
      setGradesAvailable([]);
    }
  }

  async function getSalesData() {
    await getFromAll();
  }

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //USE EFFECT CALLS

  React.useEffect(() => {
    getSalesData();
  }, [allSales, company]);

  React.useEffect(() => {
    getTimeData();
  }, [cSales, time]);

  React.useEffect(() => {
    getAvgData();
  }, [TimeRangeSales, refresh]);

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //MISCALLENOUS FUNCTIONS

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width,
    };
  }

  React.useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  const halfGrades = [];
  for (var i = 9.5; i >= 1; i = i - 1) {
    halfGrades.push(i);
  }

  function handleRadioButton(num) {
    let gone = false;
    let temp = grades;
    for (var i = temp.length - 1; i >= 0; i--) {
      if (temp[i] === num) {
        temp.splice(i, 1);
        gone = true;
      }
    }
    if (gone === false) {
      temp.push(num);
    }
    // //console.log(temp);
    setGrades(temp);
    setRefresh(!refresh);
  }
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //CONSTANTS FOR CHARTS
  const theme = {
    transparent: {
      default: "#08131F",
      hover: "#102235",
    },
    teal: {
      default: "#106f6b",
      hover: "#179992",
    },
  };
  let Button = null;
  let TimeButton = null;
  if (windowDimensions.width > 1200) {
    Button = styled.button`
      background-color: ${(props) => theme[props.theme].default};
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      margin: 5px;
      border-radius: 10px;
      color: white;
      width: 60px;
      padding: 5px 0px;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
      &:hover {
        background-color: ${(props) => theme[props.theme].hover};
      }
      &:disabled {
        cursor: default;
        opacity: 0.7;
      }
    `;
    TimeButton = styled.button`
      background-color: ${(props) => theme[props.theme].default};
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      margin: 3px;
      border-radius: 5px;
      color: white;
      width: max-content;
      padding: 5px 25px;
      font-size: smaller;
      text-align: center;
      &:hover {
        background-color: ${(props) => theme[props.theme].hover};
      }
      &:disabled {
        cursor: default;
        opacity: 0.7;
      }
    `;
  } else if (windowDimensions.width <= 1200 && windowDimensions.width > 550) {
    Button = styled.button`
      background-color: ${(props) => theme[props.theme].default};
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      margin: 1px;
      border-radius: 5px;
      color: white;
      width: fit-content;
      padding: 5px 10px;
      font-size: 1.5vw;
      text-align: center;
      &:hover {
        background-color: ${(props) => theme[props.theme].hover};
      }
      &:disabled {
        cursor: default;
        opacity: 0.7;
      }
    `;
    TimeButton = styled.button`
      background-color: ${(props) => theme[props.theme].default};
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      margin: 3px;
      border-radius: 5px;
      color: white;
      width: max-content;
      padding: 5px 15px;
      font-size: 1.5vw;
      text-align: center;
      &:hover {
        background-color: ${(props) => theme[props.theme].hover};
      }
      &:disabled {
        cursor: default;
        opacity: 0.7;
      }
    `;
  } else {
    Button = styled.button`
      background-color: ${(props) => theme[props.theme].default};
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      margin: 3px;
      border-radius: 5px;
      color: white;
      width: max-content;
      padding: 5px 25px;
      font-size: smaller;
      text-align: center;
      &:hover {
        background-color: ${(props) => theme[props.theme].hover};
      }
      &:disabled {
        cursor: default;
        opacity: 0.7;
      }
    `;
    TimeButton = styled.button`
      background-color: ${(props) => theme[props.theme].default};
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      margin: 3px;
      border-radius: 5px;
      color: white;
      width: max-content;
      padding: 5px 15px;
      font-size: smaller;
      text-align: center;
      &:hover {
        background-color: ${(props) => theme[props.theme].hover};
      }
      &:disabled {
        cursor: default;
        opacity: 0.7;
      }
    `;
  }
  const TimeToggle = styled(TimeButton)`
    opacity: 1;
    ${({ active }) => active && `opacity: 0.5;`}
  `;
  const CompanyToggle = styled(Button)`
    opacity: 1;
    ${({ active }) =>
      active && `background-color: #70AD47; &:hover{opacity:0.7;}`};
  `;
  const timeRange = ["3M", "6M", "1Y", "2Y", "ALL"];
  const companies = ["PSA", "BGS", "CGC"];
  const ToggleButtons = (props) => {
    if (props.theme === "teal") {
      // console.log(props);
      return (
        <div className="media_mobile_buttons">
          {props.type.map((type) => (
            <TimeToggle
              theme={props.theme}
              active={!(time === type)}
              onClick={(e) => {
                setTime(type);
              }}
            >
              {type}
            </TimeToggle>
          ))}
        </div>
      );
    } else {
      return (
        <div className="media_mobile_buttons">
          {props.type.map((type) => (
            <CompanyToggle
              theme={props.theme}
              active={company === type}
              onClick={(e) => {
                setrecal(true);
                setCompany(type);
              }}
            >
              {type}
            </CompanyToggle>
          ))}
        </div>
      );
    }
  };

  const gradeButton = (num) => {
    if (gradesAvailable.indexOf(num) !== -1) {
      let position = grades.indexOf(num);
      if (position === -1) {
        return (
          <>
            <div
              className="radio__button"
              onClick={() => {
                handleRadioButton(num);
              }}
            >
              <div className="chart__legend__grade__radio"></div>
              <div className="chart__legend__label">Grade {num}</div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div
              className="radio__button"
              style={{
                border: "1px solid #70AD47",
                backgroundColor: "#333e50",
              }}
              onClick={() => {
                handleRadioButton(num);
              }}
            >
              <div
                className="chart__legend__grade__radio"
                style={{ backgroundColor: colorArray[position] }}
              ></div>
              <div className="chart__legend__label">Grade {num}</div>
            </div>
          </>
        );
      }
    } else {
      return (
        <>
          <div className="disabled__radio__button">
            <div className="chart__legend__grade__radio"></div>
            <div className="chart__legend__label">Grade {num}</div>
          </div>
        </>
      );
    }
  };
    const getMaxSale = (sale) => {
      sale.map((item) => {
        let sold = item.sold;
          if (maxSale < item.sold){
            setMaxSale(item.sold);
            //console.log(item.sold);
            //console.log(maxSale);
          }
      }) 
    }

  const data = () => {
    const d = [];
    grades.map((item) => {
      d.push({
        type: "spline",
        markerType: "circle", //"circle", "square", "cross", "none"
        markerSize: 0,
        showInLegend: false,
        name: `${item}`,
        dataPoints: dataPoints(item),
      });
    });
    return d;
  };
  const dataMob = () => {
    const d = [];
    grades.map((item) => {
      d.push({
        type: "spline",
        markerType: "circle", //"circle", "square", "cross", "none"
        markerSize: 0,
        showInLegend: false,
        lineThickness: 1,
        name: `${item}`,
        dataPoints: dataPoints(item),
      });
    });
    return d;
  };

  const dataPoints = (grade) => {
    const datapoints = [];
    getMaxSale(AvgSales);
    const salesByGrades = AvgSales.filter((item) => item.grade === grade);
    salesByGrades.map((item) => {
      const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        const properDate = new Date(20 + year, month - 1, day);
        return properDate;
      };
      datapoints.push({
        x: toDate(item.date),
        y: parseInt(item.sold),
      });
    });
    return datapoints;
  };
  const colorArray = [
    "#17A35A",
    "#2278C1",
    "#DC9F29",
    "#8C3671",
    "#029DC9",
    "#242B75",
    "#BB7765",
    "#5D073F",
    "#CCC408",
    "#AC1C25",
    "#fbceb1",
    "#4b5320",
    "#a52a2a",
    "#98777b",
    "#006a4e",
    "#f4bbff",
    "#480607",
    "#6f4e37",
    "#66ff00",
  ];

  const colors = CanvasJS.addColorSet("chartSet", colorArray);
  const options = {
    zoomEnabled: true,
    colorSet: "chartSet",
    backgroundColor: "#08131f",
    theme: "none",
    animationEnabled: true,
    animationDuration: 8000,
    axisX: {
      margin: 60,
      padding: {
        top: 50,
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
      includesZero: true,
      lineThickness: 1,
      valueFormatString: "YY MMM DD",
    },
    axisY: {
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      margin: 20,
      labelFontColor: "#fff",
      includesZero: true,
      valueFormatString: "$#,###,###.##",
      tickLength: 20,
      minimum: 0,
      tickColor: "#08131F",
      lineThickness: 6,
      lineColor: "#08131F",
    },
    toolTip: {
      content:
        "Grade {name}:<br/>Date: <strong>{x}</strong><br/>Average Price: <strong>${y}</strong>",
    },
    legend: {
      cursor: "pointer",
      fontColor: "#fff",
      maxWidth: 600,
      itemWidth: 80,
      markerMargin: 10,
      itemclick: function (e) {
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
    data: data(),
  };

  const moboptions = {
    zoomEnabled: true,
    colorSet: "chartSet",
    backgroundColor: "#08131f",
    theme: "none",
    animationEnabled: true,
    animationDuration: 8000,
    height: 200,
    axisX: {
      margin: 40,
      padding: {
        top: 0,
      },
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      labelFontColor: "#fff",
      labelFontSize: 10,
      tickLength: 5,
      tickColor: "#08131F",
      lineColor: "#365C9E",
      includesZero: true,
      lineThickness: 1,
      valueFormatString: "MMM",
    },
    axisY: {
      // crosshair: {
      //   enabled: true,
      //   snapToDataPoint: true,
      //   color: "red",
      // },
      margin: 10,
      labelFontColor: "#fff",
      labelFontSize: 10,
      includesZero: true,
      valueFormatString: "$#,###,###.##",
      tickLength: 0,
      minimum: 0,
      interval: Math.ceil(((maxSale)/100)*100)/3,
      maximum: maxSale + 50,
      tickColor: "#08131F",
      lineThickness: 6,
      lineColor: "#08131F",
    },
    toolTip: {
      content:
        "Grade {name}:<br/>Date: <strong>{x}</strong><br/>Average Price: <strong>${y}</strong>",
    },
    legend: {
      cursor: "pointer",
      fontColor: "#fff",
      maxWidth: 600,
      itemWidth: 80,
      markerMargin: 10,
      itemclick: function (e) {
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
    data: dataMob(),
  };

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //FINAL RETURN
  if (windowDimensions.width > 650) {
    return (
      <div className="chart">
        <div className="chart__legend__section">
          <div className="chart__legend__company__section">
            <div className="chart__legend__companies">
              <ToggleButtons type={companies} default={0} theme="transparent" />
            </div>
          </div>
          <div className="chart__legend__grade__section">
            <div className="chart__legend__grade__10">{gradeButton(10)}</div>
            <div className="chart__legend__grades">
              {halfGrades.map((item) => {
                return [
                  <div className="chart__legend__grade">
                    {gradeButton(item)}
                  </div>,
                  <div className="chart__legend__border"></div>,
                  <div className="chart__legend__grade">
                    {gradeButton(item - 0.5)}
                  </div>,
                ];
              })}
            </div>
          </div>
        </div>
        <div className="chart__section">
          <div className="chart__header">
            <div className="chart__title">Sales History (USD)</div>
            <div className="chart__time__range">
              {user ? (
              <ToggleButtons type={timeRange} default={4} theme="teal" /> 
              ) : (
                <>
                <div className="chart_login_note">Note: Please Login for further time ranges.</div>
                <TimeToggle
              theme={"teal"}
              active={!(time === "3M")}
              onClick={(e) => {
                setTime("3M");
              }}
            >
              3M
            </TimeToggle>
            </>
              )}
            </div>
          </div>
          <div className="chart__spline__chart">
            <CanvasJSChart options={options} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="media_mobile_chart">
        <ToggleButtons type={companies} default={0} theme="transparent" />
        <ToggleButtons type={timeRange} default={4} theme="teal" />
        {windowDimensions &&
        windowDimensions.width &&
        windowDimensions.width > 650 ? (
          <>
            <div className="media_mobile_chart_main">
              <CanvasJSChart options={options} />
            </div>
          </>
        ) : (
          <>
            <div className="media_mobile_chart_main">
              <CanvasJSChart options={moboptions} />
            </div>
          </>
        )}
        <div className="media_mobile_chart_grades">
          <div className="media_mobile_chart_onegrade">{gradeButton(10)}</div>
          {halfGrades.map((item) => {
            return [
              <div className="media_mobile_chart_onegrade">
                {gradeButton(item - 0.5)}
              </div>,
            ];
          })}
        </div>
        <div className="media_mobile_chart_grades">
          {halfGrades.map((item) => {
            return [
              <div className="media_mobile_chart_onegrade">
                {gradeButton(item)}
              </div>,
            ];
          })}
        </div>
      </div>
    );
  }
}
