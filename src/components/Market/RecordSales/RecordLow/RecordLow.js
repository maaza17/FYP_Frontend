import React, { useState } from "react";
import axios from "axios";
import CatDropdown from "../../../CatDropdown/CatDropdown";
import "./RecordLow.css";
import ListingComponent from "../../../ListingComponent/ListingComponent";
import data from "../../../../data/Market/recordSalesLow.json";

function RecordLow() {
  const [show, setshow] = useState(false);
  const [selected, setSelected] = useState("Pokémon TCG");

  const posNeg = (value) => {
    if (value >= 0) {
      return <p className="relo__data__pch">+{value}%</p>;
    } else {
      return <p className="relo__data__pch__n">-{value}%</p>;
    }
  };

  const [recordSalesLow, setRecordSalesLow] = useState([]);
  React.useEffect(() => {
    axios
      .get(
        "" +
        process.env.REACT_APP_BACKEND_URL +
        "api/market/getms6low"
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
          setRecordSalesLow(temp);
          // console.log(temp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(recordSalesLow);
  return (
    <div className="record__low">
      <ListingComponent
        data={recordSalesLow}
        show={show}
        setShow={(b) => { setshow(b) }}
        order={[{ name: "name", displayName: "Card Name" }, { name: "set_name", displayName: "Set Name" }, { name: "date", displayName: "Sold Date" },{ name: "grade", displayName: "Grade" }, { name: "sold", displayName: "Sold Price"}, { name: "Language", displayName: "Language" }]}
      />
      <div className="relo__box">
        <div className="relo__heading__area">
          <h3 className="relo__heading">Record Sales/Low</h3>
          <span className="relo__description">
            <p>Discover cards with rocket speed movement.</p>
            <p>Cards reaching 52W low (past 90 days) will be listed.</p>
          </span>
          {/* <span className="relo__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="relo__info__box">
          <div className="relo__info__box__header">
            <p className="relo__cn">Card Name</p>
            <p className="relo__sn">Set Name</p>
            <p className="relo__sd">Sold Date</p>
            <p className="relo__g">Grade</p>
            <p className="relo__sp">Sold Price</p>
            {/* <p className="relo__wh">52W High</p> */}
            {/* <p className="relo__pch">% Change</p> */}
            <p className="relo__l">Language</p>
          </div>
          <div className="relo__data">
            {recordSalesLow.slice(0, 5).map((item) => {
              return (
                <>
                  <div className="relo__data__row">
                    <p className="relo__data__cn">{item.name}</p>
                    <p className="relo__data__sn">{item.set_name}</p>
                    <p className="relo__data__sd">{item.date}</p>
                    <p className="relo__data__g">{item.grade}</p>
                    <p className="relo__data__sp">{item.sold}</p>
                    {/* <p className="relo__data__wh">${item.wh}</p> */}
                    {/* <p className="relo__data__pch">{posNeg(item.pChange)}</p> */}
                    <p className="relo__data__l">{item.Language}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="relo__fl">
          <div className="relo__fl__link" onClick={()=>{setshow(true)}}>Full List {">>"}</div>
        </div>
      </div>
    </div>
  );
}

export default RecordLow;
