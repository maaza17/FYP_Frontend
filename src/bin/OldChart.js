import React from "react";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class LineChart extends React.Component {
  render() {
    // console.log(this.props.sales);
    const grades = [];
    for (var i = 10; i >= 1; i = i - 0.5) {
      grades.push(i);
    }
    const colors = CanvasJS.addColorSet("colorSet", [
      "#19A258",
      "#2277c0",
      "#d9a02f",
      "#422847",
      "#185469",
    ]);
    const data = () => {
      const d = [];
      grades.map((item) => {
        const visible = () => {
          if (item >= 8) return true;
          else return false;
        };
        d.push({
          type: "spline",
          legendMarkerType: "circle",
          markerType: "none",
          visible: visible(),
          legendMarkerBorderThickness: 10,
          legendMarkerBorderColor: "colorSet",
          showInLegend: true,
          name: `${this.props.company + " " + item}`,
          dataPoints: gradeSalesbyDate(item),
        });

        // console.log(d);
      });
      return d;
    };
    const handleMultiple = (grades, gradeSales, findItem) => {
      let localItems = grades.filter((item) => item.date === findItem.date);
      let sum = 0;
      let x = 0;
      for (x = 0; x < localItems.length; x++) {
        sum = sum + localItems[x].sold;
      }
      let newObj = { ...findItem, done: true };
      newObj.sold = sum / x;
      let alreadyThere = gradeSales.indexOf(findItem);
      gradeSales[alreadyThere] = newObj;
    };
    const gradeSalesbyDate = (grade) => {
      const grades = this.props.sales
        .filter((item) => item.grade === grade)
        .reverse();
      // console.log(grades);
      const gradeSales = [];
      grades.map((item) => {
        var findItem = gradeSales.find((x) => x.date === item.date);
        if (!findItem) {
          let newObj = { ...item, done: false };
          gradeSales.push(newObj);
        } else if (findItem && findItem.done == false) {
          handleMultiple(grades, gradeSales, findItem);
        }
      });
      const datapoints = [];
      // console.log(gradeSales);
      gradeSales.map((item) => {
        const toDate = (dateStr) => {
          const [day, month, year] = dateStr.split("-");
          const properDate = new Date(20 + year, month - 1, day);
          return properDate;
        };
        const i = 0;
        datapoints.push({
          x: toDate(item.date),
          y: item.sold,
        });
      });
      // console.log(datapoints);
      return datapoints;
    };

    const options = {
      zoomEnabled: true,
      colorSet: "colorSet",
      backgroundColor: "#08131f",
      theme: "none",
      animationEnabled: true,
      animationDuration: 5000,
      title: {
        text: "Sales Price History",
        fontColor: "#fff",
        fontSize: "18",
        fontWeight: "lighter",
        horizontalAlign: "left",
        padding: {
          top: 10,
          bottom: 15,
          left: 20,
        },
      },
      axisX: {
        margin: 10,
        padding: {
          top: 10,
        },
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          color: "red",
        },
        gridThickness: 0.5,
        labelFontColor: "#fff",
        tickLength: 0,
        lineColor: "#3939394d",
        valueFormatString: "MMM YY",
        lineThickness: 0.5,
      },
      axisY: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          color: "red",
        },
        margin: 20,
        gridThickness: 0.5,
        labelFontColor: "#fff",
        includesZero: true,
        valueFormatString: "$#,##0.##",
        tickLength: 0,
        lineColor: "#3939394d",
        lineThickness: 3,
      },
      toolTip: {
        content:
          "{name}:<br/>Date: <strong>{x}</strong><br/>Average Price: <strong>${y}</strong>",
      },
      legend: {
        cursor: "pointer",
        fontColor: "#fff",
        maxWidth: 600,
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
      data: data(),
    };
    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default LineChart;
