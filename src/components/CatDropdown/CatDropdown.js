import React, { useState, useEffect, useRef } from "react";
import "./CatDropdown.css";

function CatDropdown({ selected, setSelected }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  const [isActive, setIsActive] = useState(false);
  const options = [
    "Magic",
    "Yu-Gi-Oh!",
    "Pokémon TCG",
    "Cardfight",
    "Dragon Ball Super",
    "Flesh and Blood",
  ];
  return (
    <div ref={wrapperRef} className="catdropdown">
      <div className="catdropdown__btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="catdropdown__content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="catdropdown__item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// export default function F({ selected, setSelected },props) {
//   const wrapperRef = useRef(null);
//   CatDropdown({ selected, setSelected },wrapperRef);

//   return <div ref={wrapperRef}>{props.children}</div>;
// }
export default CatDropdown;
