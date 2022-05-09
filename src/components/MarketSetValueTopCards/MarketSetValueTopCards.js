import React from "react";
import "./MarketSetValueTopCards.css";
import axios from "axios";
import { Link } from "react-router-dom";
import empty from "../../assets/images/empty.png";

function MarketSetValueTopCards({ setFilters }) {
    const [error, setError] = React.useState(false);
  const [finalList, setfinalList] = React.useState(null);

  React.useEffect(() => {
    if (error) setError(false);
    setfinalList(null);
    axios.post("" + process.env.REACT_APP_BACKEND_URL + "api/msv/getTopCards",
        {
          selected: [setFilters],
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.message);
          setError(true);
        } else {
          setfinalList(res.data.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [setFilters]);

  function listItems() {
    if (finalList.length > 0) {
      return finalList.map((item) => {
        return (
          <div className="msv_top_card">
            <div key={item.id}>
              <Link
                to={`/product?id=${item.cardObjectID}&cardNumber=${item.card_id}`}
              >
                <img
                  className="msv_top_card_img"
                  src={item.image}
                  onError={(e) => (e.target.src = empty)}
                  alt="IMG"
                />
              </Link>
              <div className="msv_top_card_cardInfo">
                <div className="msv_top_card_cardText">
                  <p className="msv_top_card_cardName">
                    {item.name}{" "}
                    {item.card_number && item.card_number !== "Missing" ? (
                      <span>#{item.card_number}</span>
                    ) : null}
                  </p>
                  <p className="msv_top_card_cardSet">{item.set_name}</p>
                  <p className="msv_top_card_cardSet">{item.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else
      return (
        <span style={{ color: "white", fontSize: "20px", margin: "20px" }}>
          No cards found
        </span>
      );
  }
  return (
    <div className="marketsetvaluetopcards">
      <div className="msv_top_cards_header">
        Top 20 Chase Cards in Selected Set Sorted by PSA 10 Value (as of Friday,
        April 15th, 2022)
      </div>
      <div className="msv_top_card_container">
        <div className="msv_top_card_row">
          {finalList !== null ? (
            <>{listItems()}</>
          ) : (
            <>
              <div className="shop__preloader__container">
                <div className="shop__preloader">
                  <div className="shop__preloader">
                    <div className="shop__preloader">
                      <div className="shop__preloader">
                        <div className="shop__preloader"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketSetValueTopCards;
