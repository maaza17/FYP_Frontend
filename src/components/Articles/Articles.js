import React from "react";
import { Link } from "react-router-dom";
// import CardItem from './CardItem'
import "./Articles.css";

function Articles() {
  return (
    <div className="article">
      <h4 className="article__heading">Articles</h4>
      <div className="article__container">
        <div className="article__wrapper">
          <ul className="article__items">
            <li className="article__item">
              <Link className="article__item__link" to="/shop">
                <img
                  src="/images/article2.webp"
                  alt="Travel_Image"
                  className="article__item__img"
                />
              </Link>
            </li>
            <li className="article__item">
              <Link className="article__item__link" to="/shop">
                <figure className="article__item__pic-wrap">
                  <img
                    src="/images/article1.webp"
                    alt="Travel_Image"
                    className="article__item__img"
                  />
                </figure>
              </Link>
            </li>
          </ul>
          <ul className="article__items">
            <li className="article__item">
              <Link className="article__item__link" to="/shop">
                <figure className="article__item__pic-wrap">
                  <img
                    src="/images/flesh_and_blood_tcg_monarch_search_300x158_04302021.webp"
                    alt="Travel_Image"
                    className="article__item__img"
                  />
                </figure>
              </Link>
            </li>
            <li className="article__item">
              <Link className="article__item__link" to="/shop">
                <figure className="article__item__pic-wrap">
                  <img
                    src="/images/genesis-set.jpg"
                    alt="Travel_Image"
                    className="article__item__img"
                  />
                </figure>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Articles;
