import React from "react";
import Navbar from "../../components/NavbarRest/NavbarRest";
import MasterSetValueChart from "../../components/MasterSetValueChart/MasterSetValueChart";
import "./MasterSetValue.css";
import CheckBoxSetMSV from "../../components/CheckBox/CheckBoxSetMSV";
import axios from "axios";
import MarketSetValueTopCards from "../../components/MarketSetValueTopCards/MarketSetValueTopCards";
import { useLocation, useHistory } from "react-router-dom";
import Footer from "../../components/Footer_FYP/FooterFYP";

export default function MasterSetValue() {
  const history = useHistory();
  const search = useLocation().search;
  const [error, setError] = React.useState(false);
  const [setFilters, setsetFilters] = React.useState(
    new URLSearchParams(search).get("setname")
      ? new URLSearchParams(search).get("setname")
      : null
  );
  const [allsets, setallsets] = React.useState(null);
  const [showsets, setshowsets] = React.useState(false);
  const [refresh, setrefresh] = React.useState(false);
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("" + process.env.REACT_APP_BACKEND_URL + "api/user/getprofile", {
          token: sessionStorage.getItem("token"),
        })
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            setUser(res.data.data);
          }
        });
      console.log(user);
    } else {
      setUser(null);
    }
  }, [sessionStorage.getItem("token")]);

  React.useEffect(() => {
    setsetFilters(
      new URLSearchParams(search).get("setname")
        ? new URLSearchParams(search).get("setname")
        : null
    );
  }, [new URLSearchParams(search).get("setname")]);

  React.useEffect(() => {
    if (error) setError(false);
    axios
      .get("" + process.env.REACT_APP_BACKEND_URL + "api/msv/getSets")
      .then((res) => {
        if (!res.data.error) {
          setallsets(res.data.data);
          if (setFilters === null) {
            history.push("/setvalue?setname=" + res.data.data[0]);
          } else if (res.data.data.indexOf(setFilters) === -1) {
            setError(true);
          }
        } else {
          setError(true);
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  function changeSets(item) {
    history.push("/setvalue?setname=" + item);
    setrefresh(!refresh);
  }
  if (error)
    return (
      <div className="MasterSetValue">
        <Navbar user={user} />
        <div className="MasterSetValue_NavSpace"></div>
        <div className="MasterSetValue_Container">
          <div className="MasterSetValue_Error_Message">
            ERROR Loading Page
            <br />
            <br />
            Please check the URL and reload again
          </div>
        </div>
      </div>
    );
  return (
    <div className="MasterSetValue">
      <Navbar user={user} />
      <div className="MasterSetValue_NavSpace"></div>
      <div className="MasterSetValue_Container">
        <div className="MasterSetValue_Head">
          Complete PSA Graded Master Set Value
        </div>
        <div className="MasterSetValue_Head_Text">
          The complete set includes all holos, rares, commons, uncommons,
          reverse foils and secret rare cards in the set.
          <br />
          It does not include any graded sealed packs, promos, pre-release
          cards. Popular error variations (inverted back, miscut, off-centered,
          stained) are not included.
          <br />
          If no sales history for certain cards in the set, the card will not
          also be included in the chart. If certain cards does not have any
          recent sales info, we use the last sold price.
          <br />
          <br />
          <div style={{ fontStyle: "italic" }}>
            Note : Chart starts from $0 on 2019-01, most sets will have a
            useable total value starting from 2019-05, do not refer to any
            information in between, use with caution.
          </div>
        </div>
        <div className="MasterSetValue_Set">
          <div
            className="MasterSetValue_Set_Head"
            onClick={() => {
              setshowsets(true);
            }}
          >
            {setFilters ? `${setFilters}` : "Fetching Set Data..."}
            {showsets ? (
              <>
                <div className="MasterSetValue_Set_List_Container">
                  <div className="MasterSetValue_Set_List">
                    <CheckBoxSetMSV
                      hideSets={() => {
                        setshowsets(false);
                      }}
                      setFilters={setFilters}
                      allSets={allsets}
                      changeSets={(item) => {
                        changeSets(item);
                      }}
                      refresh={refresh}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div>
            <i
              style={{
                fontSize: "20px",
                color: "white",
                margin: "5px 0 0 7.5px ",
                cursor: "pointer",
              }}
              onClick={() => {
                setshowsets(true);
              }}
              class="fa fa-angle-down fa-1x"
            ></i>
          </div>
        </div>
        <div className="MasterSetValue_Set_Chart">
          <MasterSetValueChart setFilters={setFilters} />
        </div>
        <div className="MasterSetValue_correlation_section">
          <div className="MSV_correlation_header">
            Price Movement Correlation Among All Sets
          </div>
          <div className="MSV_container">
            <div className="msv_left_box">
              <div className="msv_left_box_head">
                (2019 - 2022) Overall English Set Average
              </div>
              <div className="msv_left_box_one">
                <div className="msv_left_csgrade">Complete Set (Grade)</div>
                <div className="msv_left_avco_values msvbackcolorTransparent">
                  <div className="msv_left_grade msvcolorOrange">PSA 10</div>
                  <div className="msv_left_grade msvcolorOrange">PSA 9</div>
                  <div className="msv_left_grade msvcolorOrange">PSA 8</div>
                </div>
              </div>
              <div className="msv_left_box_one">
                <div className="msv_left_csgrade2 msvcolorGreen">
                  Average Correlation Among All Sets
                </div>
                <div className="msv_left_avco_values">
                  <div className="msv_left_grade">0.8948</div>
                  <div className="msv_left_grade">0.8730</div>
                  <div className="msv_left_grade">0.8648</div>
                </div>
              </div>
            </div>
            <div className="msv_right_box">
              <div className="msv_right_box_one">
                <div className="msv_right_box_one_year msvcolorOrange">
                  Year 2021
                </div>
                <div className="msv_right_box_one_psa">
                  <div>PSA 10</div>
                  <div>PSA 9</div>
                  <div>PSA 8</div>
                </div>
                <div className="msv_right_box_one_value">
                  <div>0.1508</div>
                  <div>0.2174</div>
                  <div>0.1612</div>
                </div>
              </div>
              <div className="msv_right_box_one">
                <div className="msv_right_box_one_year msvcolorBlue">
                  Year 2021
                </div>
                <div className="msv_right_box_one_psa">
                  <div>PSA 10</div>
                  <div>PSA 9</div>
                  <div>PSA 8</div>
                </div>
                <div className="msv_right_box_one_value">
                  <div>0.9481</div>
                  <div>0.9398</div>
                  <div>0.9189</div>
                </div>
              </div>
              <div className="msv_right_box_one">
                <div className="msv_right_box_one_year msvcolorGreen">
                  Year 2021
                </div>
                <div className="msv_right_box_one_psa">
                  <div>PSA 10</div>
                  <div>PSA 9</div>
                  <div>PSA 8</div>
                </div>
                <div className="msv_right_box_one_value">
                  <div>0.8530</div>
                  <div>0.8589</div>
                  <div>0.8184</div>
                </div>
              </div>
            </div>
          </div>
          <div className="msv_correlation_note_text msvcolorOrange">
            Note: Correlation indicates how the general market moves based on
            small changes. The closer to 1.00, the higher the relation.
            Mathematically, threshold for a high correlation relies on the
            features of data itself, but for Pokémon TCG market, anything
            greater than 0.9 should be considered high.
            <br />
            <br />
            Correlation is only calculated between the same grade of different
            sets. For example, correlation of the value of complete PSA10 1999
            Unlimited Base Set between the value of complete PSA10 2016
            Evolutions. Each Grade has their own market characteristic. Only
            Grades 10, 9, 8 are calculated, grades below 8 contains a lot of
            fluctuation.
          </div>
        </div>
        <div className="MasterSetValue_Top_Cards_Section">
          <MarketSetValueTopCards setFilters={setFilters} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
