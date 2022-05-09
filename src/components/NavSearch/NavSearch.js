import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./NavSearch.css";
import axios from "axios";
import empty from "../../assets/images/empty.png";


function NavSearch() {
  const history = useHistory();
  const [data, setData] = React.useState(null);
  let [NavSearchField, setNavSearchField] = React.useState("");
  let [tempNavSearchField, setTempNavSearchField] = React.useState("");

  //NavSearch Field
  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      setNavSearchField(tempNavSearchField);
      setData(null);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [tempNavSearchField]);

  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setData(null);
        setNavSearchField("");
        setTempNavSearchField("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);


  React.useEffect(() => {
    axios
      .post(
        "" + process.env.REACT_APP_BACKEND_URL + "api/cards/searchshop",
        // "http://localhost:7000/api/cards/searchshop",
        {
          query: NavSearchField,
          setname: [],
          nameSort: 0,
          japan: true,
          english: true,
          popularity: 0,
          dateSort: 0,
          paginate: 0,
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          // console.log(res);
          if (res.data.data.length > 20) {
            setData(res.data.data.slice(0, 19));
          }
          else setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [NavSearchField]);

  const getIcon = () => {
    if (tempNavSearchField !== "") {
      return (
        <i
          onClick={() => {
            setTempNavSearchField("");
          }}
          class="fas fa-times"
        ></i>
      );
    } else return <i class="fas fa-search"></i>;
  };

  function NavSearchResults() {
    if (tempNavSearchField.length > 0) {
      if (data) {
        if (data.length > 0) {
          return (
            <div className="results__NavSearch">
              {data.map((item) => {
                return (
                  <div
                    onClick={() => {
                      history.push(
                        `/product?id=${item._id}&cardNumber=${item.sub_cat[0].card_id}`
                      );
                      setNavSearchField("");
                      setTempNavSearchField("");
                    }}
                    className="oneNavSearch"
                  >
                    <div className="navSearch__allText">
                      <div>
                        <p className="navSearch__text">{item.name}{((item.card_number)&&(item.card_number!=="Missing")) ? <>{" "}#{item.card_number}</> : null}</p>
                      </div>
                      <p className="navSearch__smalltext">{item.set_name}</p>
                      <p className="navSearch__smalltext">{(item.releaseYear) ? <>{item.releaseYear}{" "}</> : null}{(item.language) ? <>({item.language})</> : null}</p>
                    </div>
                    <img
                      className="navSearch__search__image"
                      src={item.sub_cat[0].image}
                      onError={(e) => ((e.target.src = empty))}
                      alt="IMG"
                    />
                  </div>
                );
              })}
            </div>
          );
        } else {
          return <p className="results__NavSearch">No results found</p>;
        }
      } else {
        return <p className="results__NavSearch">Loading...</p>;
      }
    } else return null;
  }

  return (
    <>
      <div className="NavSearchWhole">
        <input
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              setTempNavSearchField("");
              history.push("/search?q="+ev.target.value)
            }
          }}
          className="product__NavSearch"
          type="text"
          placeholder="Search"
          value={tempNavSearchField}
          onChange={(e) => {
            setTempNavSearchField(e.target.value);
          }}
        />
        {getIcon()}
      </div>
      <div ref={wrapperRef} className="resultBox__NavSearch">{NavSearchResults()}</div>
    </>
  );
}
export default NavSearch;
