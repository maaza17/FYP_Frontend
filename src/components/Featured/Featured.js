import React, { useRef } from "react";
import "./Featured.css";
import { Link } from "react-router-dom";
import empty from "../../assets/images/empty.png";
import axios from "axios"

const Featured = () => {
  const [list, setList] = React.useState(null);
  const [rightVisvible, setrightVisvible] = React.useState(false);
  const [leftVisvible, setleftVisvible] = React.useState(true);
  const [refresh, setrefresh] = React.useState(true);
  const hasWindow = typeof window !== 'undefined';

  function getWindowWidth() {
    const width = hasWindow ? window.innerWidth : null;
    return width/2
  }

  // React.useEffect(() => {
    // if (hasWindow && window.location.pathname === "/") {
    //   function handleResize() {
    //     setWindowDimensions(getWindowDimensions());
    //   }

    //   window.addEventListener('resize', handleResize);
    //   return () => window.removeEventListener('resize', handleResize);
    // }
  // }, [hasWindow]);



  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (window.location.pathname === "/") {
        if (document.getElementById("featFirst")) {
          if (
            document.getElementById("featFirst").getBoundingClientRect().x < 400 &&
            document.getElementById("featFirst").getBoundingClientRect().x > 0
          ) setleftVisvible(true);
          else setleftVisvible(false);
        }
        if (document.getElementById("featLast")) {
          if (
            document.getElementById("featLast").getBoundingClientRect().x < 1600 &&
            document.getElementById("featLast").getBoundingClientRect().x > 800
          ) setrightVisvible(true);
          else setrightVisvible(false);
        }
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [refresh]);



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
        return list.map((item) => {
          if (list.indexOf(item) === 0) return <Link
            id="featFirst"
            to={`/product?id=${item._id}&cardNumber=${item.sub_cat[0].card_id}`}
            className="f-card_img"
          >
            <img src={item.sub_cat[0].image} alt="IMG" onError={(e) => ((e.target.src = empty))} />
            <div className="f-card_title">{item.name} {(!(isNaN(item.card_number))) ? <span>#{item.card_number}</span> : null}</div>
            <div className="f-card_desc">{item.set_name}</div>
            <div className="f-card_cat">{item.releaseYear}</div>
          </Link>
          else if (list.indexOf(item) === (list.length - 1)) return <Link
            id="featLast"
            to={`/product?id=${item._id}&cardNumber=${item.sub_cat[0].card_id}`}
            className="f-card_img"
          >
            <img src={item.sub_cat[0].image} alt="IMG" onError={(e) => ((e.target.src = empty))} />
            <div className="f-card_title">{item.name} {(!(isNaN(item.card_number))) ? <span>#{item.card_number}</span> : null}</div>
            <div className="f-card_desc">{item.set_name}</div>
            <div className="f-card_cat">{item.releaseYear}</div>
          </Link>
          else return <Link
            to={`/product?id=${item._id}&cardNumber=${item.sub_cat[0].card_id}`}
            className="f-card_img"
          >
            <img src={item.sub_cat[0].image} alt="IMG" onError={(e) => ((e.target.src = empty))} />
            <div className="f-card_title">{item.name} {(!(isNaN(item.card_number))) ? <span>#{item.card_number}</span> : null}</div>
            <div className="f-card_desc">{item.set_name}</div>
            <div className="f-card_cat">{item.releaseYear}</div>
          </Link>
        }
        );
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
      <div className="featured-heading">Featured Cards</div>
      <div className="featured-carousel">
        {(leftVisvible) ?
          <a className="switchLeft">
            <i class="fas fa-chevron-left" style={{ color: "rgb(0,0,0,0.4)", cursor: "default" }}></i>
          </a>
          :
          <a className="switchLeft" onClick={() => { scroll(-getWindowWidth()); setrefresh(!refresh) }}>
            <i class="fas fa-chevron-left" style={{ cursor: "pointer" }}></i>
          </a>
        }
        <div className="carouselbox"
          onScroll={() => {
            const timeOutId = setTimeout(() => { setrefresh(!refresh) }, 250);
            return () => clearTimeout(timeOutId);
          }}
          ref={ref}>
          {fItems()}
        </div>
        {(rightVisvible) ?
          <a className="switchRight" >
            <i class="fas fa-chevron-right" style={{ color: "rgb(0,0,0,0.4)", cursor: "default" }}></i>
          </a>
          :
          <a className="switchRight" onClick={() => { scroll(getWindowWidth()); setrefresh(!refresh) }}>
            <i class="fas fa-chevron-right" style={{ cursor: "pointer" }}></i>
          </a>
        }
      </div>
    </div>
  );
  //   }
};

export default Featured;
