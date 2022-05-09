import React, { useState } from "react";
import setData from "../../data/category.json";
import "./Dropdown.css";
import { Link } from "react-router-dom";

function Dropdown({ category, align }) {
  const ALIGN = ["right", "center", "left"];
  const [click, setClick] = useState(false);
  const data = setData.find((i) => i.title === category);
  const sets = data.sets;
  const sortedSets = sets.sort(
    (a, b) =>
      new Date(...b.createdDate.split("/").reverse()) -
      new Date(...a.createdDate.split("/").reverse())
  );

  const handleClick = () => setClick(!click);
  const checkalign = ALIGN.includes(align) ? align : ALIGN[0];

  return (
    <div className={`dropdown ${checkalign}`}>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        <div className="category__name">
          <h3>{category}</h3>

          <Link className="shop-all" to={`/shop`}>
            Shop All
          </Link>
        </div>
        <div className="bottom">
          <div className="latest__sets">
            <h5 className="latest__sets__heading">Latest Sets</h5>
            <div className="set__names">
              {sortedSets.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={"/shop"} onClick={() => setClick(false)}>
                      {item.set_Name}
                    </Link>
                  </li>
                );
              })}
            </div>
          </div>
          <div className="latest__set">
            <div className="latest__set_pic">
              <figure className="latest__set__pic-wrap">
                <img
                  src={sortedSets[0].set_img}
                  alt="Travel_Image"
                  className="latest__set__img"
                />
              </figure>
            </div>
            <h2>{sortedSets[0].set_Name}</h2>
            <Link to={`/shop`}>
              <button className="latest__set__btn">Check Out More</button>
            </Link>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Dropdown;
