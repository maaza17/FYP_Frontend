import React, { useState } from "react";
import axios from "axios";
// import CatDropdown from "../../../CatDropdown/CatDropdown";
import Line from "../../../Line/Line"
import "./SalesValueBreakdown.css";

function SalesValueBreakdown() {
  const [selected, setSelected] = useState("Pokémon TCG");
  const [salesValue, setSalesValue] = useState([]);
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  React.useEffect(() => {
    axios
      .get("" + process.env.REACT_APP_BACKEND_URL + "api/market/getms22")
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // setcardPopulation(res.data.data);
          // console.log(res.data.data);
          let temp = res.data.count[0];
          // for (var j = 0; j < temp.length; j++) {
          //   temp[j].date = temp[j].date
          //     .slice(0, 10)
          //     .split("-")
          //     .reverse()
          //     .join("-");
          // }
          setSalesValue(temp);
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(salesValue);
  const ninetyDays = salesValue["90days"];
  // console.log(ninetyDays);
  return (
    <div className="sales__revenue__breakdown">
      <div className="srbl__box">
        <div className="srbl__heading__area">
          <h3 className="srbl__heading">
            Sales Volume <br />
            Breakdown by Language
          </h3>
        </div>
        <div className="srbl__graph__area">
          <div className="srbl__top">
            <div className="srbl__graph__header">
              <div className="srbl__graph__heading">Past 90 Days</div>
            </div>
            <div className="srbl__pd__graph">
              <div className="srbl__pd__bar__container">
                {ninetyDays ? (
                  <>
                    <div id="from4" className="srbl__pd__bar" >
                      <div
                        className="srbl__pd__bar__japan"
                        id="from3"
                        style={{
                          minWidth: `${ninetyDays[1].toFixed(2)}%`,
                          maxWidth: `${ninetyDays[1].toFixed(2)}%`,
                        }}
                      ></div>
                    </div>
                    <div id="line3"></div>
                    <div id="line4"></div>
                    <Line
                      num={3}
                      color={"#78AF53"}
                      invert={false}
                    />
                    <Line
                      num={4}
                      color={"#507AC4"}
                      invert={true}
                    />
                  </>
                ) : null}
              </div>
              <div className="srbl__pd__data">
                <div className="srbl__pd__jap" id="to3">
                  <p className="srbl__language">
                    Japanese Cards:{" "}
                    <span className="srbl__pd__jap__value">
                      {ninetyDays ? ninetyDays[1].toFixed(2) : null}%
                    </span>
                  </p>
                  <p className="srbl__total">
                    Total: {ninetyDays ? numFormatter(ninetyDays[0]) : null}
                  </p>
                </div>
                <div className="srbl__pd__eng" id="to4">
                  <p className="srbl__language">
                    English Cards:{" "}
                    <span className="srbl__pd__eng__value">
                      {ninetyDays ? ninetyDays[3].toFixed(2) : null}%
                    </span>
                  </p>
                  <p className="srbl__total">
                    Total: {ninetyDays ? numFormatter(ninetyDays[2]) : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="srbl__bottom">
            <div className="srbl__graph__header">
              <div className="srbl__graph__heading">(2019 - 2022) Full History Statistics</div>
            </div>
            <div className="srbl__fhs__graph">
              <div id="content" className="srbl__fhs__bar__container">
                {ninetyDays ? (
                  <>
                    <div
                      id="from2"
                      className="srbl__fhs__bar">
                      <div
                        id="from1"
                        className="srbl__fhs__bar__japan"
                        style={{
                          minWidth: `${salesValue.fullhistory[1].toFixed(2)}%`,
                          maxWidth: `${salesValue.fullhistory[1].toFixed(2)}%`,
                        }}
                      ></div>
                    </div>
                    <div id="line1"></div>
                    <div id="line2"></div>
                    <Line
                      num={1}
                      color={"#F9C013"}
                      invert={false}
                    />
                    <Line
                      num={2}
                      color={"#783EA3"}
                      invert={true}
                    />
                  </>
                ) : null}
              </div>
              <div className="srbl__fhs__data">
                <div className="srbl__fhs__jap" id="to1" >
                  <p className="srbl__language">
                    Japanese Cards:{" "}
                    <span className="srbl__fhs__jap__value">
                      {ninetyDays ? salesValue.fullhistory[1].toFixed(2) : null}
                      %
                    </span>
                  </p>
                  <p className="srbl__total">
                    Total: {ninetyDays ? numFormatter(salesValue.fullhistory[0]) : null}
                  </p>
                </div>
                <div className="srbl__fhs__eng" id="to2">
                  <p className="srbl__language">
                    English Cards:{" "}
                    <span className="srbl__fhs__eng__value">
                      {ninetyDays ? salesValue.fullhistory[3].toFixed(2) : null}
                      %
                    </span>
                  </p>
                  <p className="srbl__total">
                    Total: {ninetyDays ? numFormatter(salesValue.fullhistory[2]) : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesValueBreakdown;
