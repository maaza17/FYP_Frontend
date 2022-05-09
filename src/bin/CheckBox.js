import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";
import "../../pages/Shop.css";
const categories = [
  {
    id: 1,
    name: "Magic: The Gathering",
  },
  {
    id: 2,
    name: "Yu-Gi-Oh!",
  },
  {
    id: 3,
    name: "Pokémon",
  },
  {
    id: 4,
    name: "Cardfight!! Vanguard",
  },
  {
    id: 5,
    name: "Dragon Ball Super Card Game",
  },
  {
    id: 6,
    name: "Flesh And Blood",
  },
];

const CheckBox = (props) => {
  const newList = props.myCatFilters;
  const [Checked, setChecked] = useState([]);
  React.useEffect(() => {
    if (newList[0] !== undefined){
      setChecked(newList);
    }
    if (Checked[0] !== undefined) {
      props.catHandleFilters(Checked);
    }
  }, []);
  const renderCheckList = () =>
    categories.map((value, index) => (
      <React.Fragment key={index}>
        <div className="shop__OneBox">
          <div className="shop__Box">
            <Checkbox
              onChange={() => {
                handleToggle(value.name);
              }}
              type="checkbox"
              checked={Checked.indexOf(value.name) === -1 ? false : true}
            />
          </div>
          <p> {value.name}</p>
        </div>
      </React.Fragment>
    ));
  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.catHandleFilters(newChecked);
  };
  return (
    <div className="shop__OneBigBox">
      <h2>Product Line Name</h2>
      {renderCheckList()}
    </div>
  );
};
export default CheckBox;
