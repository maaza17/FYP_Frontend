import React from "react";
import axios from "axios";
import './MarketLoader.css';
import Market from "../../pages/Market/Market";
import Market2 from "../../pages/Market2/Market2";

export default function MarketLoader({ user, loading, check, setCheck }) {
  return (
    <>
      {(loading) ? (
        <div className="marketloader__preloader__whole">
          <div className="marketloader__preloader__container">
            <div className="marketloader__preloader">
              <div className="marketloader__preloader">
                <div className="marketloader__preloader">
                  <div className="marketloader__preloader">
                    <div className="marketloader__preloader">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {user ? <Market user={user} check={check}
            setCheck={(val) => {
              setCheck(val);
            }} /> : <Market2 />}
        </>
      )}
    </>
  )
}
