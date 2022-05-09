import React, { useState } from "react";
import axios from "axios";
import CatDropdown from "../../../CatDropdown/CatDropdown";
import "./PopularCards.css";
import ListingComponent from "../../../ListingComponent/ListingComponent";
import data from "../../../../data/Market/popularCards.json";

function PopularCards() {
  const [selected, setSelected] = useState("Pokémon TCG");
  const [show, setshow] = useState(false);

  const posNeg = (value) => {
    if (value >= 0) {
      return <p className="pc__data__pch">+{value}%</p>;
    } else {
      return <p className="pc__data__pch__n">-{value}%</p>;
    }
  };

  const [popCards, setPopCards] = useState([]);
  React.useEffect(() => {
    axios
      .get(
        "" +
        process.env.REACT_APP_BACKEND_URL +
        "api/market/getms3"
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // setcardPopulation(res.data.data);
          // console.log(res.data.count);
          setPopCards(res.data.count);
          // console.log(popCards);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(popCards);

  // for (var j = 0; j < popCards.length; j++) {
  //   popCards[j].date = popCards[j].date
  //     .slice(0, 10)
  //     .split("-")
  //     .reverse()
  //     .join("-");
  // }
  return (
    <div className="popular__cards">
      <ListingComponent show={show} setShow={(b) => { setshow(b) }}
        data={popCards}
        order={[{ name: "name", displayName: "Card Name" }, { name: "set_name", displayName: "Set Name" }, { name: "volume", displayName: "90 Days Sales Volume" }, { name: "psa_10", displayName: "PSA 10 Price", type:"currency" }, { name: "psa_9", displayName: "PSA 9 Price", type:"currency" }, { name: "psa_8", displayName: "PSA 8 Price", type:"currency" }, { name: "year", displayName: "Release Year" }, { name: "language", displayName: "Language" }]}
      />
      <div className="pc__box">
        <div className="pc__heading__area">
          <h3 className="pc__heading">Popular Cards</h3>
          <span className="pc__description">
            <p>Find out the most liquidate/popular cards up to date.</p>
            <p>(Basic Criteria: 90 Days Sales Volume {">"} 50)</p>
          </span>
          {/* <span className="pc__dropdown">
            <CatDropdown selected={selected} setSelected={setSelected} />
          </span> */}
        </div>
        <div className="pc__table__box">
          <div className="pc__info__box">
            <div className="pc__info__box__header">
              <p className="pc__cn">Card Name</p>
              <p className="pc__sn">Set Name</p>
              <p className="pc__dsv">90 Days Sales Volume</p>
              <p className="pc__10p">PSA 10 Price</p>
              <p className="pc__9p">PSA 9 Price</p>
              <p className="pc__8p">PSA 8 Price</p>
              <p className="pc__ry">Release Year</p>
              <p className="pc__l">Language</p>
            </div>
            <div className="pc__data">
              {popCards.slice(0, 8).map((item) => {
                return (
                  <>
                    <div className="pc__data__row">
                      <p className="pc__data__cn">{item.name}</p>
                      <p className="pc__data__sn">{item.set_name}</p>
                      <p className="pc__data__dsv">
                        {item.volume}
                      </p>
                      <p className="pc__data__10p">
                        ${item.psa_10}
                      </p>
                      <p className="pc__data__9p">
                        ${item.psa_9}
                      </p>
                      <p className="pc__data__8p">
                        ${item.psa_8}
                      </p>
                      <p className="pc__data__ry">{item.year}</p>
                      <p className="pc__data__l">{item.language}</p>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="pc__fl">
              <div className="pc__fl__link" onClick={() => { setshow(true) }}>Full List {">>"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCards;
