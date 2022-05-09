import React, { useRef } from "react";
import "./Featured.css";
import { Link } from "react-router-dom";
import empty from "../assets/images/empty.png";
import axios from "axios"
import { ListItemSecondaryAction } from "@material-ui/core";

const Featured = () => {
  const [list, setList] = React.useState(null);
  React.useEffect(() => {
    axios
      .post(
        "" + process.env.REACT_APP_BACKEND_URL + "api/cards/getFeaturedCards",
        // "http://localhost:7000/api/cards/searchshop",
        {
          paginate: 0
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          setList(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  function fItems() {
    if (list) {
      if (list.length > 0) {
        return list.map((item) => (
          <Link
            to={`/product?id=${item._id}&cardNumber=${item.sub_cat[0].card_id}`}
            className="f-card_img"
          >
            <img src={item.sub_cat[0].image} alt="IMG" onError={(e) => ((e.target.src = empty))} />
            <div className="f-card_title">{item.name} {(!(isNaN(item.card_number))) ? <span>#{item.card_number}</span> : null}</div>
            <div className="f-card_desc">{item.set_name}</div>
            <div className="f-card_cat">{item.releaseYear}</div>
          </Link>
        ));
      }
      else return <div className="featured__message">No Featured Cards Found</div>
    }
    else return <div className="featured__message">Loading...</div>
  }
        const ref = useRef(null);
  const scroll = (scrollOffset) => {
          ref.current.scrollLeft += scrollOffset;
  };
        return (
        <div className="featured">
          <div className="featured-carousel">
            <a className="switchLeft sliderButton" onClick={() => scroll(-600)}>
              <i class="fas fa-chevron-left"></i>
            </a>
            <div className="carouselbox" ref={ref}>
              {fItems()}
            </div>
            <a className="switchRight sliderButton" onClick={() => scroll(600)}>
              <i class="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
        );
  //   }
};

        export default Featured;
