import React, { useRef, useEffect } from "react";


const CheckBoxSet = ({ hideSets, allSets, setFilters, changeSets }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        hideSets();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref]);

  if (allSets) {
    if (allSets.length > 0) {
      return <div ref={ref}> {allSets.map((item) => (
        <div
          className={(setFilters.indexOf(item) === -1) ? "MasterSetValue_Set_List_OneLine" : "MasterSetValue_Set_List_OneLine_Selected"}
          onClick={() => { changeSets(item); }}
        >
          {item}
        </div>
      ))}</div>
    }
    else return <span style={{ color: "white", fontSize: "12px" }}> No sets found</span>;
  }
  else return <span style={{ color: "white", fontSize: "12px" }}> Loading...</span>;
}
export default CheckBoxSet;
