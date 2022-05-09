import React from "react";
import { Link } from "react-router-dom";
import "./LatestSet.css";
import setData from "../../data/category.json";

let sets = [];
const data = () => {
  for (var i = 0; i < setData.length; i++) {
    for (var j = 0; j < setData[i].sets.length; j++) {
      sets.push(setData[i].sets[j]);
    }
  }
  return sets;
};
sets = data();
let sortedSets = sets.sort(
  (a, b) =>
    new Date(...b.createdDate.split("/").reverse()) -
    new Date(...a.createdDate.split("/").reverse())
);
sortedSets = sortedSets.slice(0, 12);
function LatestSet() {
  return (
    <div className="sets">
      <h4 className="latest__sets__h4">Latest Sets</h4>
      <div className="all__pic__wrap">
        {sortedSets.map((item) => {
          return (
            <Link to="/shop">
              <div
                className="sets__item__pic-wrap"
                style={{ backgroundImage: `url(${item.set_img})` }}
                data-category={item.category}
              >
                {/* <h5 className="sets__item__cat">{item.category}</h5> */}
              </div>
              <div className="sets__item__info">
                <h5 className="sets__item__set">{item.set_Name}</h5>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LatestSet;
