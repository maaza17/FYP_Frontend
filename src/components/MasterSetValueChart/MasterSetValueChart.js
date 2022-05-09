//IMPORT
import React, { useState } from "react";
import styled from "styled-components";
import "./MasterSetValueChart.css";
import axios from "axios"
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart({ setFilters }) {
    //USE STATE VARIABLES
    const hasWindow = typeof window !== "undefined";
    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
    const [time, setTime] = useState("ALL");
    const [sales, setsales] = React.useState(null);
    const [AvgSales, setAvgSales] = React.useState(null);
    const [TimeRangeSales, setTimeRangeSales] = React.useState(null);
    const [grades, setGrades] = React.useState([10, 9, 8]);
    const [gradesAvailable, setGradesAvailable] = React.useState([]);
    const [refresh, setRefresh] = React.useState(true);
    const [maxSale, setMaxSale] = React.useState(5000);

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //CHILD CALL TO ASYNC FUNCTION

    async function getFromAll() {
        axios.post(
            "" +
            process.env.REACT_APP_BACKEND_URL +
            "api/msv/getChartData",
            {
                selected: [setFilters],
            }
        ).then((res) => {
            if (!res.data.error) {
                if (res.data.data[0]) {
                    let tempSales = [];
                    let records = [];
                    records.push(res.data.data[0].psa_1);
                    records.push(res.data.data[0].psa_2);
                    records.push(res.data.data[0].psa_3);
                    records.push(res.data.data[0].psa_4);
                    records.push(res.data.data[0].psa_5);
                    records.push(res.data.data[0].psa_6);
                    records.push(res.data.data[0].psa_7);
                    records.push(res.data.data[0].psa_8);
                    records.push(res.data.data[0].psa_9);
                    records.push(res.data.data[0].psa_10);
                    for (var i = 0; i < records.length; i++) {
                        for (var j = 0; j < records[i].length; j++) {
                            let temp = {
                                "date": records[i][j].date.slice(0, 10).split("-").reverse().join("-"),
                                "grade": i + 1,
                                "value": records[i][j].value
                            }
                            tempSales.push(temp);
                        }
                    }
                    setsales(tempSales);
                }
            } else {
                setsales([]);
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    async function GetTimeRangeSales() {
        let temp = [];
        if (time === "ALL") {
            temp = sales;
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
            temp = sales.filter(
                (item) =>
                    item.date.split("-").reverse().join("") >
                    date.split("-").reverse().join("")
            );
        }
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
                sum = item.value;
            } else {
                if (prev.date === item.date && prev.grade === item.grade) {
                    sum = sum + item.value;
                    count = count + 1;
                } else {
                    prev.value = sum / count;
                    temp.push(prev);
                    prev = item;
                    sum = item.value;
                    count = 1;
                    if (TimeRangeSales.indexOf(item) === TimeRangeSales.length - 1) {
                        temp.push(prev);
                    }
                }
            }
        });
        if (temp.length < 1) {
            setAvgSales([]);
        } else {
            setAvgSales(temp);
        }
    }

    async function getAvailable() {
        let temp = [];
        TimeRangeSales.map((item) => {
            if (temp.indexOf(item.grade) === -1) {
                temp.push(item.grade);
            }
        });
        setGradesAvailable(temp);
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //PARENT CALL TO ASYNC FUNCTION
    async function getTimeData() {
        if (sales !== null && sales.length > 1) {
            await GetTimeRangeSales();
        } else {
            setTimeRangeSales([]);
        }
    }

    async function getAvgData() {
        if (TimeRangeSales !== null && TimeRangeSales.length > 1) {
            await GetAvgSales();
            await getAvailable();
        } else {
            setAvgSales([]);
            setGradesAvailable([]);
        }
    }

    async function getSalesData() {
        setsales(null);
        await getFromAll();
    }

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //USE EFFECT CALLS

    React.useEffect(() => {
        getSalesData();
    }, [setFilters]);

    React.useEffect(() => {
        getTimeData();
    }, [sales, time]);

    React.useEffect(() => {
        getAvgData();
    }, [TimeRangeSales, refresh]);

    React.useEffect(() => {
        let sold = 0;
        if (grades && grades.length > 0) {
            grades.map((BIGITEM) => {
                if (AvgSales) {
                    const temp2 = AvgSales.filter((item) => item.grade === BIGITEM);
                    if (temp2 && temp2.length > 0) {
                        temp2.map((item) => {
                            if (sold < item.value) {
                                sold = item.value;
                            }
                        })
                    }
                }
            })
        }
        if (sold === 0) setMaxSale(5000);
        else setMaxSale(sold);
    }, [grades, refresh, TimeRangeSales, AvgSales]);

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

    const allGrades = [];
    for (var i = 10; i >= 1; i = i - 1) {
        allGrades.push(i);
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
        // console.log(temp);
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
    let TimeButton = null;
    if (windowDimensions.width > 1200) {
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
    } else {
        TimeButton = styled.button`
      background-color: ${(props) => theme[props.theme].default};
      outline: none;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      margin: 3px 5px;
      border-radius: 5px;
      color: white;
      width: max-content;
      padding: 5px 12px;
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
    const timeRange = ["3M", "6M", "1Y", "2Y", "ALL"];
    const ToggleButtons = (props) => {
        return (
            <div className="MSVC_media_mobile_buttons">
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
    };

    const gradeButton = (num) => {
        if (gradesAvailable.indexOf(num) !== -1) {
            let position = grades.indexOf(num);
            if (position === -1) {
                return (
                    <>
                        <div
                            className="MSVC_radio__button"
                            onClick={() => {
                                handleRadioButton(num);
                            }}
                        >
                            <div className="MSVC_chart__legend__grade__radio"></div>
                            <div className="MSVC_chart__legend__label">Grade {num}</div>
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <div
                            className="MSVC_radio__button"
                            style={{
                                border: "1px solid #70AD47",
                                backgroundColor: "#333e50",
                            }}
                            onClick={() => {
                                handleRadioButton(num);
                            }}
                        >
                            <div
                                className="MSVC_chart__legend__grade__radio"
                                style={{ backgroundColor: colorArray[position] }}
                            ></div>
                            <div className="MSVC_chart__legend__label">Grade {num}</div>
                        </div>
                    </>
                );
            }
        } else {
            return (
                <>
                    <div className="MSVC_disabled__radio__button">
                        <div className="MSVC_chart__legend__grade__radio"></div>
                        <div className="MSVC_chart__legend__label">Grade {num}</div>
                    </div>
                </>
            );
        }
    };

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
        if (AvgSales) {
            const salesByGrades = AvgSales.filter((item) => item.grade === grade);
            salesByGrades.map((item) => {
                const toDate = (dateStr) => {
                    const [day, month, year] = dateStr.split("-");
                    const properDate = new Date(20 + year, month - 1, day);
                    return properDate;
                };
                datapoints.push({
                    x: toDate(item.date),
                    y: parseInt(item.value),
                });
            });
        }
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
            margin: 40,
            padding: {
                top: 50,
            },
            labelFontColor: "#fff",
            tickLength: 20,
            tickColor: "#08131F",
            lineColor: "#365C9E",
            includesZero: true,
            lineThickness: 1,
            valueFormatString: "YY MMM DD",
        },
        axisY: {
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
            margin: 10,
            labelFontColor: "#fff",
            labelFontSize: 10,
            includesZero: true,
            valueFormatString: "$#,###,###.##",
            tickLength: 0,
            minimum: 0,
            interval: Math.ceil(((maxSale) / 100) * 100) / 3,
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
    // if (windowDimensions.width > 650) {
    return (
        <div className="MSVC_chart">
            <div className="MSVC_chart__section">
                <div className="MSVC_chart__header">
                    <div className="MSVC_chart__time__range">
                        <ToggleButtons type={timeRange} default={4} theme="teal" />
                    </div>
                </div>
                <div className="MSVC_chart__spline__chart">
                    {(setFilters) ?
                        (sales && TimeRangeSales && AvgSales) ?
                            (windowDimensions.width > 650) ? <CanvasJSChart options={options} />
                                : <CanvasJSChart options={moboptions} />
                            : <div className="MSVC_Graph_Loader">Fetching Chart Data...</div>
                        : <div className="MSVC_Graph_Loader">Waiting for Set Data...</div>
                    }
                </div>
            </div>
            <div className="MSVC_chart__legend__section">
                <div className="MSVC_chart__legend__grade__section">
                    <div className="MSVC_chart__legend__grades">
                        {allGrades.map((item) => {
                            return [
                                <div className="MSVC_chart__legend__grade">
                                    {gradeButton(item)}
                                </div>
                            ];
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
