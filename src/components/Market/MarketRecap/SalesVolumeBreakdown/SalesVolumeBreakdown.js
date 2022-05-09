import React, { useState } from "react";
import axios from "axios";
import  MySteppedLineTo  from "../../../MySeppedLineTo/MySteppedLineTo"
import "./SalesVolumeBreakdown.css";

function SalesVolumeBreakdown() {
  const [selected, setSelected] = useState("Pokémon TCG");
  const [salesVolume, setSalesVolume] = useState([]);
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
      .get("" + process.env.REACT_APP_BACKEND_URL + "api/market/getms21")
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
          setSalesVolume(temp);
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(salesVolume);

  const ninetyDays = salesVolume["90days"];
  // console.log(ninetyDays);
  return (
    <div className="sales__volume__breakdown">
      <div className="svb__box">
        <div className="svb__heading__area">
          <h3 className="svb__heading">Sales Value Breakdown by Language</h3>
          {/* <span className="svb__description">
            <p>Recognize which language to choose from.</p>
            <p>(Past 30 days with past 30-60 days.)</p>
          </span> */}
          {/* <span className="svb__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="svb__graph__area">
          <div className="svb__left">
            <div className="svb__graph__header">
              <div className="svb__graph__heading">Past 90 Days</div>
            </div>
            <div className="svb__pd__graph">
              <div className="svb__pd__data">
                <div className="svb__pd__jap to6">
                  <p className="svb__language">
                    Japanese Cards:{" "}
                    <span className="svb__pd__jap__value">
                      {ninetyDays ? ninetyDays[1].toFixed(2) : null}%
                    </span>
                  </p>
                  <p className="svb__total">
                    Total: {ninetyDays ? numFormatter(ninetyDays[0].toFixed(2)) : null}
                  </p>
                </div>
                <div className="svb__pd__eng to5">
                  <p className="svb__language">
                    English Cards:{" "}
                    <span className="svb__pd__eng__value">
                      {ninetyDays ? ninetyDays[3].toFixed(2) : null}%
                    </span>
                  </p>
                  <p className="svb__total">
                    Total: {ninetyDays ? numFormatter(ninetyDays[2].toFixed(2)) : null}
                  </p>
                </div>
              </div>
              <div className="svb__pd__bar__container">
                {ninetyDays ? (<>
                  <div className="svb__pd__bar from5">
                    <div
                      className="svb__pd__bar__japan from6"
                      id="from6"
                      style={{
                        minHeight: `${(ninetyDays[1].toFixed(2) / 100) * 400
                          }px`,
                        maxHeight: `${(ninetyDays[1].toFixed(2) / 100) * 400
                          }px`,
                      }}
                    ></div>
                  </div>
                  <MySteppedLineTo
                    from="from5" to="to5" borderColor="#783EA3" borderWidth={2} delay={1000} toAnchor={"bottom"} fromAnchor={"bottom"}
                  />
                  <MySteppedLineTo
                    from="from6" to="to6" borderColor="#F9C013" borderWidth={2} delay={1000} toAnchor={"top"} fromAnchor={"top"}
                  />
                </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="svb__right">
            <div className="svb__graph__header">
              <div className="svb__graph__heading">(2019 - 2022) Full History Statistics</div>
            </div>
            <div className="svb__fhs__graph">
              <div className="svb__fhs__bar__container">
                {ninetyDays ? (<>
                  <div className="svb__fhs__bar from8">
                    <div
                      className="svb__fhs__bar__japan from7"
                      style={{
                        minHeight: `${(salesVolume.fullhistory[1].toFixed(2) / 100) * 400
                          }px`,
                        maxHeight: `${(salesVolume.fullhistory[1].toFixed(2) / 100) * 400
                          }px`,
                      }}
                    ></div>
                  </div>
                  <MySteppedLineTo
                    from="from7" to="to7" borderColor="#78AF53" borderWidth={2} delay={1000} toAnchor={"top"} fromAnchor={"top"}
                  />
                  <MySteppedLineTo
                    from="from8" to="to8" borderColor="#507AC4" borderWidth={2} delay={1000} toAnchor={"bottom"} fromAnchor={"bottom"}
                  />
                  </>
                ) : null}
              </div>
              <div className="svb__fhs__data">
                <div className="svb__fhs__jap to7">
                  <p className="svb__language">
                    Japanese Cards:{" "}
                    <span className="svb__fhs__jap__value">
                      {ninetyDays
                        ? salesVolume.fullhistory[1].toFixed(2)
                        : null}
                      %
                    </span>
                  </p>
                  <p className="svb__total">
                    Total:{" "}
                    {ninetyDays ? numFormatter(salesVolume.fullhistory[0].toFixed(2)) : null}
                  </p>
                </div>
                <div className="svb__fhs__eng to8">
                  <p className="svb__language">
                    English Cards:{" "}
                    <span className="svb__fhs__eng__value">
                      {ninetyDays
                        ? salesVolume.fullhistory[3].toFixed(2)
                        : null}
                      %
                    </span>
                  </p>
                  <p className="svb__total">
                    Total:{" "}
                    {ninetyDays ? numFormatter(salesVolume.fullhistory[2].toFixed(2)) : null}
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

export default SalesVolumeBreakdown;
