import React from "react";
import axios from "axios";
import './MasterLoader.css';
import MasterSetValue from "../../pages/MasterSetValue/MasterSetValue";
import MasterSetValue2 from "../../pages/MasterSetValue2/MasterSetValue2";

export default function MasterLoader({ user, loading, check, setCheck }) {
  return (
    <>
      {loading ? (
        <div className="masterloader__preloader__whole">
          <div className="masterloader__preloader__container">
            <div className="masterloader__preloader">
              <div className="masterloader__preloader">
                <div className="masterloader__preloader">
                  <div className="masterloader__preloader">
                    <div className="masterloader__preloader">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {user ? <MasterSetValue user={user} check={check}
            setCheck={(val) => {
              setCheck(val);
            }} /> : <MasterSetValue2 />}
        </>
      )}
    </>
  )
}
