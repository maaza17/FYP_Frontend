import React, { useState } from "react";
import axios from "axios";
import CatDropdown from "../../../CatDropdown/CatDropdown";
import "./PremiumSales.css";
import data from "../../../../data/Market/premiumSales.json";
import ListingComponent from "../../../ListingComponent/ListingComponent";

function PremiumSales() {
  const [show, setshow] = useState(false);
  const [selected, setSelected] = useState("Pokémon TCG");

  const posNeg = (value) => {
    if (value >= 0) {
      return <p className="prsa__data__pch">+{value}%</p>;
    } else {
      return <p className="prsa__data__pch__n">-{value}%</p>;
    }
  };
  const [premiumSales, setPremiumSales] = useState([]);
  React.useEffect(() => {
    axios
      .get(
        "" +
        process.env.REACT_APP_BACKEND_URL +
        "api/market/getms6premium"
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          let temp = res.data.count;
          for (var j = 0; j < temp.length; j++) {
            temp[j].date = temp[j].date
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-");
          }
          setPremiumSales(temp);
          // console.log(premiumSales);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(premiumSales);
  return (
    <div className="premium__sales">
      <ListingComponent
        data={premiumSales}
        show={show}
        setShow={(b) => { setshow(b) }}
        order={[{ name: "name", displayName: "Card Name" }, { name: "set_name", displayName: "Set Name" }, { name: "date", displayName: "Sold Date" }, { name: "grade", displayName: "Grade" }, { name: "sold", displayName: "Sold Price" }, { name: "Language", displayName: "Language" }]}
      />
      <div className="prsa__box">
        <div className="prsa__heading__area">
          <h3 className="prsa__heading">Premium Sales</h3>
          <span className="prsa__description">
            <p>Uncover the high-end sales in the past 90 days.</p>
            <p>(Minimum sold price {">"} $2,000.)</p>
          </span>
          {/* <span className="prsa__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="prsa__info__box">
          <div className="prsa__info__box__header">
            <p className="prsa__cn">Card Name</p>
            <p className="prsa__sn">Set Name</p>
            <p className="prsa__sd">Sold Date</p>
            <p className="prsa__g">Grade</p>
            <p className="prsa__sp">Sold Price</p>
            {/* <p className="prsa__pr">Prior Sold</p> */}
            {/* <p className="prsa__pch">% Change</p> */}
            <p className="prsa__l">Language</p>
          </div>

          <div className="prsa__data">
            {premiumSales.slice(0, 8).map((item) => {
              return (
                <>
                  <div className="prsa__data__row">
                    <p className="prsa__data__cn">{item.name}</p>
                    <p className="prsa__data__sn">{item.set_name}</p>
                    <p className="prsa__data__sd">{item.date}</p>
                    <p className="prsa__data__g">{item.grade}</p>
                    <p className="prsa__data__sp">{item.sold}</p>
                    {/* <p className="prsa__data__pr">${item.priorSold}</p> */}
                    {/* <p className="prsa__data__pr">{posNeg(item.pChange)}</p> */}
                    <p className="prsa__data__l">{item.Language}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="prsa__fl">
          <div className="prsa__fl__link" onClick={() => { setshow(true) }}>Full List {">>"}</div>
        </div>
      </div>
    </div>
  );
}

export default PremiumSales;
