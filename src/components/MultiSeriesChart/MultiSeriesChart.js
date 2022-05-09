  import React from "react";
  import CanvasJSReact from "../../assets/canvasjs.react";
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  class MultiSeriesChart extends React.Component {
    render() {
      const colors = CanvasJS.addColorSet("colorSet", [
        "#19A258",
        "#2277c0",
        "#d9a02f",
        "#422847",
        "#185469",
      ]);
      const options = {
        zoomEnabled: true,
        colorSet: "colorSet",
        backgroundColor: "#08131f",
        theme: "none",
        // height: 370,
        animationEnabled: true,
        animationDuration: 2000,
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
          minimum: 50,
          tickColor: "#08131F",
          lineThickness: 6,
          lineColor: "#08131F",
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
        data: this.props.data,
      };
      return (
        <div>
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
        </div>
      );
    }
  }
  export default MultiSeriesChart;
