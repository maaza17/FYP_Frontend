import React, { useState } from "react";
import axios from "axios";
import CatDropdown from "../../../CatDropdown/CatDropdown";
import "./PopularSets.css";
import Japdata from "../../../../data/Market/popSetJap.json";
import Engdata from "../../../../data/Market/popSetEng.json";
import ListingComponent from "../../../ListingComponent/ListingComponent";

function PopularSets() {
  const [engshow, setengshow] = useState(false);
  const [japshow, setjapshow] = useState(false);

  const [selected, setSelected] = useState("Pokémon TCG");

  const [popSetEng, setPopSetEng] = useState([]);
  const [popSetJap, setPopSetJap] = useState([]);
  React.useEffect(() => {
    axios
      .get(
        "" +
        process.env.REACT_APP_BACKEND_URL +
        "api/market/getmsj4"
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // setcardPopulation(res.data.data);
          // console.log(res.data.data);
          setPopSetJap(res.data.count);
          // console.log(popSetEng);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "" +
        process.env.REACT_APP_BACKEND_URL +
        "api/market/getmse4"
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // setcardPopulation(res.data.data);
          // console.log(res.data.count);
          setPopSetEng(res.data.count);
          // console.log(popSetEng);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(popSetEng);
  // console.log(popSetJap);
  // for (var j = 0; j < popSetEng.length; j++) {
  //   popSetEng[j].date = popSetEng[j].date
  //     .slice(0, 10)
  //     .split("-")
  //     .reverse()
  //     .join("-");
  // }

  return (
    <div className="popular__sets">
      <ListingComponent show={engshow} setShow={(b) => { setengshow(b) }}
        data={popSetEng}
        order={[{ name: "set_name", displayName: "Set Name" }, { name: "sales_vol", displayName: "90 Days Sales Volume" }, { name: "percentage", displayName: "Percentage%" , type:"percentage" }]}
      />
      <ListingComponent show={japshow} setShow={(b) => { setjapshow(b) }}
        data={popSetJap}
        order={[{ name: "set_name", displayName: "Set Name" }, { name: "sales_vol", displayName: "90 Days Sales Volume" }, { name: "percentage", displayName: "Percentage%" , type:"percentage" }]}
      />
      <div className="ps__box">
        <div className="ps__heading__area">
          <h3 className="ps__heading">Popular Sets</h3>
          <span className="ps__description">
            <p>Find out the most liquidate/popular sets up to date.</p>
            <p>(Seperated into Japanese and English two categories.)</p>
          </span>
          {/* <span className="ps__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="ps__table__box">
          <div className="ps__jap__set">
            <div className="ps__jap__set__name">
              <div className="ps__jap__set__box">Japanese Set</div>
            </div>
            <div className="ps__jap__set__header">
              <p className="ps__jap__sn">Set Name</p>
              <p className="ps__jap__dsv">90 Days Sales Volume</p>
              <p className="ps__jap__p">Percentage %</p>
            </div>
            <div className="ps__data">
              {popSetJap.slice(0, 5).map((item) => {
                return (
                  <>
                    <div className="ps__data__row">
                      <p className="ps__data__sn">{item.set_name}</p>
                      <p className="ps__data__dsv">{item.sales_vol}</p>
                      <p className="ps__data__p">{item.percentage.toFixed(2)}%</p>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="ps__fl">
              <div className="ps__fl__link" onClick={() => { setjapshow(true) }}>Full List {">>"}</div>
            </div>
          </div>
          <div className="ps__eng__set">
            <div className="ps__eng__set__name">
              <div className="ps__eng__set__box">English Set</div>
            </div>
            <div className="ps__eng__set__header">
              <p className="ps__eng__sn">Set Name</p>
              <p className="ps__eng__dsv">90 Days Sales Volume</p>
              <p className="ps__eng__p">Percentage %</p>
            </div>
            <div className="ps__data">
              {popSetEng.slice(0, 5).map((item) => {
                return (
                  <>
                    <div className="ps__data__row">
                      <p className="ps__data__sn">{item.set_name}</p>
                      <p className="ps__data__dsv">{item.sales_vol}</p>
                      <p className="ps__data__p">{item.percentage.toFixed(2)}%</p>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="ps__fl">
              <div className="ps__fl__link" onClick={() => { setengshow(true) }}>Full List {">>"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularSets;
