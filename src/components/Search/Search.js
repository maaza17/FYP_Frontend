import React from "react";
import empty from "../../assets/images/empty.png";
import { useHistory } from "react-router-dom";
import "./Search.css";
import axios from "axios"

function Search({ user,check,setCheck}) {
  const history = useHistory();
  console.log(user);
  const [data, setData] = React.useState(null);
  let [searchField, setSearchField] = React.useState("");
  let [tempSearchField, setTempSearchField] = React.useState("");

  //Search Field
  React.useEffect(() => {
    const timeOutId = setTimeout(() => { setSearchField(tempSearchField); setData(null) }, 1000);
    return () => clearTimeout(timeOutId);
  }, [tempSearchField]);


  React.useEffect(() => {
    axios
      .post(
        "" + process.env.REACT_APP_BACKEND_URL + "api/cards/searchall",
        // "http://localhost:7000/api/cards/searchall",
        {
          query: searchField
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          console.log(res)
          setData(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchField])

  const getIcon = () => {
    if (tempSearchField !== "") {
      return (
        <i
          onClick={() => {
            setTempSearchField("");
          }}
          class="fas fa-times"
        ></i>
      );
    } else return <i class="fas fa-search"></i>;
  };

  function searchResults() {
    if (tempSearchField.length > 0) {
      if (data) {
        if (data.length > 0) {
          return (
            <div className="results__search">
              {data.map((item) => {
                return (
                  <div
                    onClick={() => {
                      history.push(`/product?id=${item._id}&cardNumber=${item.sub_cat[0].card_id}`);
                      setSearchField("");
                      setTempSearchField("");
                    }}
                    className="oneSearch"
                  >
                    <div className="allText">
                      <div>
                        <p className="text">{item.name}</p>
                      </div>
                      <p className="smalltext">{item.set_name}</p>
                      {(!(isNaN(item.card_number))) ? <p className="smalltext">#{item.card_number}</p> : null}
                    </div>
                    <img
                      className="search__image"
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
          return <p className="results__search">No results found</p>;
        }
      } else {
        return <p className="results__search">Loading...</p>;
      }
    }
    else return null
  }

  return (
    <>
      <div className="searchWhole">
        <input
          className="product__search"
          type="text"
          placeholder="Search"
          value={tempSearchField}
          onChange={(e) => {
            setTempSearchField(e.target.value);
          }}
        />
        {getIcon()}
      </div>
      <div className="resultBox__search">{searchResults()}</div>
    </>
  );
}
export default Search;
