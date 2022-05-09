import React from "react";
import { Link } from "react-router-dom";
import "./Shop.css";
import CheckBox from "../components/CheckBox/CheckBox";
import CheckBoxSet from "../components/CheckBox/CheckBoxSet";
import Pagination from "../components/Pagination/Pagination";
// import Navbar from "../components/Navbar/Navbar";
import product_card from "../data/Ampharos.json";
import categoryData from "../data/category.json";
import empty from "../../assets/images/empty.png";

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      items: product_card,
      searchField: "",
      catFilters: {},
      setFilters: {},
      myCatFilters: [],
      mySetFilters: [],
      nameSortASC: true,
      dateSort: false,
      categorizedList: product_card,
      setList: product_card,
      currentPage: 1,
      cardsPerPage: 25,
      Cdone: true,
      Sdone: false,
      Done: true,
      allSetDates: [],
      startCat: "All",
      startSet: "All",
    };
  }
  render() {
    //Get State
    const {
      items,
      searchField,
      catFilters,
      setFilters,
      myCatFilters,
      mySetFilters,
      nameSortASC,
      dateSort,
      categorizedList,
      setList,
      currentPage,
      cardsPerPage,
      Done,
      startCat,
      startSet,
    } = this.state;

    //Process URL
    let urlarr = this.props.match.url.split("/");

    if (urlarr.length === 2) {
      urlarr.push("All");
      urlarr.push("All");
    } else if (urlarr.length === 3) {
      urlarr.push("All");
    }

    //One Time Run Only

    const allSetDatesFunction = () => {
      let tempAllSetDates = [];
      for (var i = 0; i < categoryData.length; i++) {
        for (var j = 0; j < categoryData[i].sets.length; j++) {
          let date = categoryData[i].sets[j].createdDate;
          let name = categoryData[i].sets[j].set_Name;
          tempAllSetDates.push({ date, name });
        }
      }
      return tempAllSetDates;
    };

    //Category
    const catHandleFilters = (filters, category) => {
      const newFilters = { ...catFilters };
      newFilters[category] = filters;
      showCatFilteredResults(newFilters);
      this.setState({ myCatFilters: newFilters[category] });
    };
    const showCatFilteredResults = (filters) => {
      let CatString = "";
      for (var i = 0; i < filters.categories.length; i++) {
        CatString = CatString + " " + filters.categories[i].toLowerCase() + " ";
      }
      let newList = {};
      if (!(filters.categories[0] === undefined)) {
        newList = items.filter((product_card) =>
          CatString.includes(product_card.category.toLowerCase())
        );
        this.setState({ categorizedList: newList, setList: newList });
      } else {
        this.setState({ categorizedList: items, setList: items });
      }
    };

    //Sets
    const setHandleFilters = (filters, sets) => {
      const newFilters = { ...setFilters };
      newFilters[sets] = filters;
      showSetFilteredResults(newFilters);
      this.setState({ mySetFilters: newFilters[sets] });
    };

    const showSetFilteredResults = (filters) => {
      let SetString = "";
      for (var i = 0; i < filters.sets.length; i++) {
        SetString = SetString + " " + filters.sets[i].toLowerCase() + " ";
      }
      let newList = {};
      if (!(filters.sets[0] === undefined)) {
        newList = categorizedList.filter((product_card) =>
          SetString.includes(product_card.set_name.toLowerCase())
        );
        this.setState({ setList: newList });
      } else {
        this.setState({ setList: categorizedList });
      }
    };
    //First Lets handle set and cat list
    if (startCat !== urlarr[2]) {
      //TRUE
      let tempnewlistCAT = [];
      let tempnewlistSet = [];
      this.setState({ startCat: urlarr[2] });
      if (urlarr[2] !== "All") {
        tempnewlistCAT = this.state.myCatFilters;
        tempnewlistCAT[0] = urlarr[2];
      }
      if (startSet !== urlarr[3]) {
        this.setState({ startSet: urlarr[3], Sdone: true });
        if (urlarr[3] !== "All") {
          tempnewlistSet = this.state.mySetFilters;
          tempnewlistSet[0] = urlarr[3];
        }
      }
      catHandleFilters(tempnewlistCAT, "categories");
      setHandleFilters(tempnewlistSet, "sets");
      this.setState({ Done: true });
    }
    if (startSet !== urlarr[3]) {
      this.setState({ startSet: urlarr[3], Sdone: true });
      let tempnewlistSet = [];
      if (urlarr[3] !== "All") {
        tempnewlistSet = this.state.mySetFilters;
        tempnewlistSet[0] = urlarr[3];
        this.setState({ Done: true });
      }
      setHandleFilters(tempnewlistSet, "sets");
    }

    if (Done) {
      this.setState({ Done: false });
      if (urlarr[2] !== "All") {
        catHandleFilters(myCatFilters, "categories");
      }
      if (urlarr[3] !== "All") {
        setHandleFilters(mySetFilters, "sets");
      }
    }

    //Sorting
    let nameSortedList = setList.sort((a, b) => {
      if (nameSortASC) {
        return a.product_name.localeCompare(b.product_name);
      } else {
        return -1 * a.product_name.localeCompare(b.product_name);
      }
    });

    let dateSortedList = nameSortedList.sort((a, b) => {
      let dataset = allSetDatesFunction();
      if (dateSort) {
        let first = a.set_name;
        let second = b.set_name;
        let firstDate = dataset
          .find((o) => o.name === first)
          .date.split("/")
          .reverse()
          .join("");
        console.log(firstDate);
        let secondDate = dataset
          .find((o) => o.name === second)
          .date.split("/")
          .reverse()
          .join("");
        return firstDate.localeCompare(secondDate);
      } else {
        return nameSortedList;
      }
    });

    //Searching
    let All = dateSortedList.filter((product_card) =>
      product_card.product_name
        .toLowerCase()
        .includes(searchField.toLowerCase())
    );

    //Listing
    let listItems = All.map((item) => (
      <div className="shop__card">
        <div key={item.id}>
          <Link to={`/product/${item._id}/${item.cardNumber}`}>
            <img
              className="shop__card_img"
              src={item.thumb}
              onError={(e) => (e.target.onerror = null)((e.target.src = empty))}
              alt="IMG"
            />
          </Link>
          <div className="shop__cardInfo">
            <div className="shop__cardText">
              <p className="shop__cardName">{item.product_name}</p>
              <p className="shop__cardSet">{item.set_name}</p>
            </div>
          </div>
        </div>
      </div>
    ));

    // Get current cards
    const indexOfLastcard = currentPage * cardsPerPage;
    const indexOfFirstcard = indexOfLastcard - cardsPerPage;
    const currentcards = listItems.slice(indexOfFirstcard, indexOfLastcard);

    // Change page
    const paginate = (pageNumber) => {
      this.setState({ currentPage: pageNumber });
      window.scrollTo(0, 0);
    };

    //Return Page
    return (
      <div className="shop">
        {/* <Navbar page="other" search="hide" /> */}
        <div className="shop__shop">
          <div className="shop__search-main">
            <input
              type="search"
              className="shop__shop__search"
              placeholder="Search"
              value={this.state.searchField}
              onChange={(e) => {
                this.setState({ searchField: e.target.value });
              }}
            />
          </div>
          <div className="shop__Main">
            <div className="shop__FS-Container">
              <h3>Filter</h3>
              <div className="shop__OneBigBox">
                <h2>Sort</h2>
                <div className="shop__OneBox">
                  <div className="shop__Box">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        this.setState({ nameSortASC: !nameSortASC });
                      }}
                      defaultChecked={true}
                    />
                  </div>
                  <span>By Name</span>
                </div>
                <div className="shop__OneBox">
                  <div className="shop__Box">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        this.setState({ dateSort: !dateSort });
                      }}
                      defaultChecked={false}
                    />
                  </div>
                  <span>By Date Created of Set</span>
                </div>
              </div>
              <div className="shop__filter-main">
                <div>
                  <CheckBox
                    myCatFilters={this.state.myCatFilters}
                    catHandleFilters={(filters) => {
                      catHandleFilters(filters, "categories");
                    }}
                  />
                </div>
                <br />
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <CheckBoxSet
                    myCatFilters={this.state.myCatFilters}
                    mySetFilters={this.state.mySetFilters}
                    Sdone={this.state.Sdone}
                    setHandleFilters={(filters) => {
                      setHandleFilters(filters, "sets");
                    }}
                  />
                </div>
                <br />
              </div>
              <br />
            </div>
            <div className="shop__right_side">
              <div className="shop__results__found">
                <div className="shop__ResultText">
                  Found {listItems.length} results
                </div>
              </div>
              <div className="shop__card-container">
                <div className="shop__row">{currentcards}</div>
              </div>
              <div>
                <Pagination
                  cardsPerPage={this.state.cardsPerPage}
                  totalcards={listItems.length}
                  paginate={paginate}
                  currentPage={this.state.currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
