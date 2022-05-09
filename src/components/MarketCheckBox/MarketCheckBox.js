import React, { useState } from "react";
import "./MarketCheckBox.css";

function MarketCheckBox(props) {
  const categories = [
    {
      super: "Market Recap",
      sub: ["Average Sales Price", "Sales Value Breakdown", "Sales Volume Breakdown"],
    },
    {
      super: "Market Movers",
      sub: ["Popular Cards", "Popular Sets", "Popular Characters"],
    },
    {
      super: "Record Sales",
      sub: ["Record High", "Record Low", "Premium Sales"],
    },
    {
      super: "Grading Companies",
      sub: ["Sales Volume by Grading Companies"],
    },
  ];
  const [SuperChecked, setSuperChecked] = useState(0);
  const [Checked, setChecked] = useState(0);
  const [hide, sethide] = useState(false);



  function delayedExec(after, fn) {
    let timer;
    return function () {
      timer && clearTimeout(timer);
      timer = setTimeout(fn, after);
    };
  };

  function checkHide() {
    // console.log(document.documentElement.scrollHeight)
    if (document.documentElement.scrollTop > document.documentElement.scrollHeight -  1200) {
      sethide(true);
    }
    else if (document.documentElement.scrollTop < document.documentElement.scrollHeight - 1200) {
      sethide(false);
    }
  }

  var scrollStopper = delayedExec(40, function () {
    onScrollProgress();
  });

  React.useEffect(() => {
    // console.log()
    if (window.location.pathname === "/market") {
      window.addEventListener('scroll', scrollStopper);
      window.addEventListener('scroll', checkHide);
      window.scrollTo(0, 0);
      return () => {
        window.removeEventListener("scroll", scrollStopper);
         window.removeEventListener("scroll", checkHide);
      }
    }
  }, [window.location.pathname]);

  React.useEffect(() => {
    if (document.getElementById("" + SuperChecked + Checked + "")) {
      document.getElementById("" + SuperChecked + Checked + "").scrollIntoView({ block: "center" })
    }
  }, [Checked, SuperChecked]);




  function onScrollProgress() {
    if (!hide) {
    if (document.documentElement.scrollTop === 0) {
      select(0, 0);
    }
    else {
      for (var i = 0; i < categories.length; i++) {
        for (var j = 0; j < categories[i].sub.length; j++) {

          let word = i + "" + j;
          if (document.getElementById(word)) {
            if (
              document.getElementById(word).getBoundingClientRect().y < 300 &&
              document.getElementById(word).getBoundingClientRect().y > -100
            ) {
              select(i, j);
            }
          }
        }
      }
    }
    }
  };

  const renderSuperCheckList = () =>
    categories.map((value, index) => {
      if (index === SuperChecked)
        return (
          <React.Fragment key={index}>
            <div className="OneCat">
              <div
                className="OneBox"
                onClick={() => { select(index, 0) }}
                style={{
                  cursor: "pointer",
                  borderLeft: "solid #54a4d3 6px",
                  borderRadius: "25px",
                  backgroundColor: "#142940",
                  padding: "5px",

                }}
              >
                <div className="Box">
                  <h2 style={{ color: "white" }} className="heads"  >
                    {value.super}
                  </h2>
                </div>
              </div>
              <div>{renderCheckList(index, value.super, value.sub)}</div>
            </div>
          </React.Fragment>
        );
      else
        return (
          <React.Fragment key={index}>
            <div className="OneCat">
              <div className="OneBox" onClick={() => { select(index, 0) }}>
                <div className="Box">
                  <h2 style={{ color: "white" }} className="heads">
                    {value.super}
                  </h2>
                </div>
              </div>
              <div>{renderUnselectedCheckList(index, value.super, value.sub)}</div>
            </div>
          </React.Fragment>
        );
    });
  function renderCheckList(supNum, sup, data) {
    return data.map((value, index) => {
      if (index === Checked)
        return (
          <React.Fragment key={index}>
            <div className="OneCatBox">
              <div
                className="OneBox"
                onClick={() => { select(supNum, index) }}
                style={{
                  borderLeft: "solid #80128C 6px",
                  borderRadius: "25px",
                  backgroundColor: "#142940",
                  padding: "5px",
                  marginLeft: "10px",
                }}
              >
                <div className="Box">
                  <p style={{ color: "white" }}> {value}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      else
        return (
          <React.Fragment key={index}>
            <div className="OneCatBox">
              <div onClick={() => { select(supNum, index) }} className="OneBox" style={{ marginLeft: "10px" }}>
                <div className="Box">
                  <p style={{ color: "white" }}> {value}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
    });
  }

  function renderUnselectedCheckList(supNum, sup, data) {
    return data.map((value, index) => {
      return (
        <React.Fragment key={index}>
          <div className="OneCatBox">
            <div
              onClick={() => { select(supNum, index) }}
              className="OneBox"
              style={{
                marginLeft: "10px",
              }}
            >
              <div className="Box">
                <p style={{ color: "white" }}> {value}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }
  const select = (sup, sub) => {
    setChecked(sub);
    setSuperChecked(sup);
  };
  if (hide) return null;
  else 
  return <>
    <div className="market-page-title">Market Research Tool</div>
    <div className="market__OneBigBox">{renderSuperCheckList()}</div>
  </>;
};
export default MarketCheckBox;
