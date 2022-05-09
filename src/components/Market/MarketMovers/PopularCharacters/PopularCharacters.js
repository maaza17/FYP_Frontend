import React, { useState } from "react";
import axios from "axios";
import CatDropdown from "../../../CatDropdown/CatDropdown";
import "./PopularCharacters.css";
import Overdata from "../../../../data/Market/popCharOverMar.json";
import Japdata from "../../../../data/Market/popCharJapSet.json";
import Engdata from "../../../../data/Market/popCharEngSet.json";
import CanvasJSReact from "../../../../assets/canvasjs.react";
import ListingComponent from "../../../ListingComponent/ListingComponent";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PopularCharacters() {
  const [selected, setSelected] = useState("Pokémon TCG");
  const [show, setshow] = useState(false);

  const [popCharacter, setPopCharacter] = useState([]);
  React.useEffect(() => {
    axios
      .get("" + process.env.REACT_APP_BACKEND_URL + "api/market/getms7")
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // setcardPopulation(res.data.data);
          // console.log(res.data.count);
          setPopCharacter(res.data.count);
          // console.log(popCharacter);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(popCharacter);
  const dataPoints = () => {
    if (popCharacter.length > 0) {
      const dp = [];
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        if(i<=4){
          dp.push({
            name: popCharacter[i].character,
            y: popCharacter[i].percentage,
            exploded:true
          });
        }
        else{
        dp.push({
          name: popCharacter[i].character,
          y: popCharacter[i].percentage,
        });}
        sum += popCharacter[i].percentage;
      }
      dp.push({ name: "Others", y: 100 - sum });
      return dp;
    } else return [];
  };

  const colors = CanvasJS.addColorSet("doughnutcolorSet", [
    "#17A35A",
    "#2278C1",
    "#DC9F29",
    "#8C3671",
    "#029DC9",
    "#242B75",
    "#BB7765",
    "#5D073F",
    "#CCC408",
  ]);
  const options = {
    animationEnabled: true,
    animationDuration: 2000,
    backgroundColor: "#0F0F0F",
    colorSet: "doughnutcolorSet",
    theme: "dark1",
    // height: 400,
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
        indexLabelFontSize: 12,
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
    <div className="popular__characters">
      <ListingComponent
        show={show}
        setShow={(b) => { setshow(b) }}
        data={popCharacter}
        order={[{ name: "character", displayName: "Character Name" }, { name: "sales_vol", displayName: "90 Days Sales Volume" }, { name: "rank", displayName: "Rank" }, { name: "percentage", displayName: "90 Day Percentage", type:"percentage" }]}
      />
      <div className="pch__box">
        <div className="pch__heading__area">
          <h3 className="pch__heading">Popular Characters</h3>
          <span className="pch__description">
            <p>Detect the most popular character/Pokemon.</p>
          </span>
          {/* <span className="pch__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="pch__table__box">
          <div className="pch__table__top">
            <div className="pch__overall__set">
              <div className="pch__overall__set__name">
                <div className="pch__overall__set__box">Overall Market</div>
              </div>
              <div className="pch__overall__set__header">
                <p className="pch__overall__cn">Character Name</p>
                <p className="pch__overall__dsv">90 Days Sales Volume</p>
                <p className="pch__overall__r">Rank</p>
                <p className="pch__overall__dp">90 Day Percentage</p>
              </div>
              <div className="pch__data">
                {popCharacter.slice(0, 8).map((item) => {
                  return (
                    <>
                      <div className="pch__data__row">
                        <p className="pch__data__cn">{item.character}</p>
                        <p className="pch__data__dsv">{item.sales_vol}</p>
                        <p className="pch__data__r">{item.rank}</p>
                        <p className="pch__data__dp">
                          {item.percentage.toFixed(2)}%
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="pch__fl">
                <div className="pch__fl__link" onClick={()=>{setshow(true)}}>Full List {">>"}</div>
              </div>
            </div>
            <div className="pch__graph">
              <div className="pch__doughnut">
                <CanvasJSChart options={options} />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

                <div className="pch__legend__section">
                  <div className="pch__legends__row">
                    <div className="legend">
                      <div className="pch__legend__r1"></div>
                      <div className="pch__legend__r1__char">
                        {popCharacter.length > 0
                          ? popCharacter[0].character
                          : null}
                      </div>
                    </div>
                    <div className="legend">
                      <div className="pch__legend__r2"></div>
                      <div className="pch__legend__r2__char">
                        {popCharacter.length > 0
                          ? popCharacter[1].character
                          : null}
                      </div>
                    </div>
                    <div className="legend">
                      <div className="pch__legend__r3"></div>
                      <div className="pch__legend__r3__char">
                        {popCharacter.length > 0
                          ? popCharacter[2].character
                          : null}
                      </div>
                    </div>
                    <div className="legend">
                      <div className="pch__legend__r4"></div>
                      <div className="pch__legend__r4__char">
                        {popCharacter.length > 0
                          ? popCharacter[3].character
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="pch__legends__row">
                    <div className="legend">
                      <div className="pch__legend__r5"></div>
                      <div className="pch__legend__r5__char">
                        {popCharacter.length > 0
                          ? popCharacter[4].character
                          : null}
                      </div>
                    </div>
                    <div className="legend">
                      <div className="pch__legend__r6"></div>
                      <div className="pch__legend__r6__char">
                        {popCharacter.length > 0
                          ? popCharacter[5].character
                          : null}
                      </div>
                    </div>
                    <div className="legend">
                      <div className="pch__legend__r7"></div>
                      <div className="pch__legend__r7__char">
                        {popCharacter.length > 0
                          ? popCharacter[6].character
                          : null}
                      </div>
                    </div>
                    <div className="legend">
                      <div className="pch__legend__r8">   </div>
                      <div className="pch__legend__r8__char">
                        {popCharacter.length > 0
                          ? popCharacter[7].character
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="pch__legends__row">
                    <div className="legend">
                      <div className="pch__legend__r9"></div>
                      <div className="pch__legend__r9__char">
                        {popCharacter.length > 0
                          ? "Others"
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCharacters;
