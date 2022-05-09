import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DoughnutChart extends React.Component {
  render() {
    const colors = CanvasJS.addColorSet("doughnutcolorSet", [
      "#91df70",
      "#a4c2f4",
      "#e6b8af",
    ]);
    const options = {
      animationEnabled: true,
      animationDuration: 2000,
      backgroundColor: "#08131f",
      colorSet: "doughnutcolorSet",
      theme: "dark1",
      height: 272.9,
      axisY:{
        includesZero: true,  //try changing it to true
      },
      subtitles: [
        {
          verticalAlign: "center",
          fontSize: 20,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: false,
          indexLabel: "{name}: {y}",
          yValueFormatString: "(##.##'%)'",
          startAngle: -90,
          radius: "100%",
          innerRadius: "60%",
          dataPoints: [
            { name: "Graded by PSA: ", y: (this.props.psa ? this.props.psa : 0), exploded: true },
            { name: "Graded by BGS: ", y: (this.props.bgs ? this.props.bgs : 0) },
            { name: "Graded by CGC: ", y: (this.props.cgc ? this.props.cgc : 0) },
          ],
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default DoughnutChart;
