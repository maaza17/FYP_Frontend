import React, { useState } from "react";
import axios from "axios";
import CatDropdown from "../../../CatDropdown/CatDropdown";
import "./RecordHigh.css";
import data from "../../../../data/Market/recordSalesHigh.json";
import ListingComponent from "../../../ListingComponent/ListingComponent";

function RecordHigh() {
  const [selected, setSelected] = useState("Pokémon TCG");
  const [show, setshow] = useState(false);

  const posNeg = (value) => {
    if (value >= 0) {
      return <p className="rehi__data__pch">{value}%</p>;
    } else {
      return <p className="rehi__data__pch__n">-{value}%</p>;
    }
  };

  const [recordSalesHigh, setRecordSalesHigh] = useState([]);
  React.useEffect(() => {
    axios
      .get(
        "" +
          process.env.REACT_APP_BACKEND_URL +
          "api/market/getms6high"
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          let temp =res.data.count;
          for (var j = 0; j < temp.length; j++) {
            temp[j].date = temp[j].date
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-");
          }
          setRecordSalesHigh(temp);
          // console.log(temp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(recordSalesHigh);
  
  return (
    <div className="record__high">
      <ListingComponent
        data={recordSalesHigh}
        show={show}
        setShow={(b)=>{setshow(b)}}
        order={[{ name: "name", displayName: "Card Name" }, { name: "set_name", displayName: "Set Name" }, { name: "date", displayName: "Sold Date" }, { name: "grade", displayName: "Grade" }, { name: "sold", displayName: "Sold Price"}, { name: "Language", displayName: "Language" }]}
      />
      <div className="rehi__box">
        <div className="rehi__heading__area">
          <h3 className="rehi__heading">Record Sales / High</h3>
          <span className="rehi__description">
            <p>Discover cards with rocket speed movement.</p>
            <p>Cards reaching 52W high (past 90 days) will be listed.</p>
          </span>
          {/* <span className="rehi__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="rehi__table__box">
          <div className="rehi__info__box"> 
            <div className="rehi__info__box__header">
              <p className="rehi__cn">Card Name</p>
              <p className="rehi__sn">Set Name</p>
              <p className="rehi__sd">Sold Date</p>
              <p className="rehi__g">Grade</p>
              <p className="rehi__sp">Sold Price</p>
              {/* <p className="rehi__wlow">52W Low</p> */}
              {/* <p className="rehi__pch">% Change</p> */}
              <p className="rehi__l">Language</p>
            </div>
            <div className="rehi__data">
              {recordSalesHigh.slice(0, 5).map((item) => {
                return (
                  <>
                    <div className="rehi__data__row">
                      <p className="rehi__data__cn">{item.name}</p>
                      <p className="rehi__data__sn">{item.set_name}</p>
                      <p className="rehi__data__sd">{item.date}</p>
                      <p className="rehi__data__g">{item.grade}</p>
                      <p className="rehi__data__sp">{item.sold}</p>
                      {/* <p className="rehi__data__wlow">${item.wl}</p> */}
                      {/* <p className="rehi__data__pch">{posNeg(item.pChange)}</p> */}
                      <p className="rehi__data__l">{item.Language}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="rehi__fl">
            <div className="rehi__fl__link" onClick={()=>{setshow(true)}}>Full List {">>"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordHigh;
