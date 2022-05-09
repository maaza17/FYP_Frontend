import React from "react";
import "./Snapshot.css";
import styled from "styled-components";

function Snapshot({ allSales }) {

  const hasWindow = typeof window !== 'undefined';
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width
    };
  }

  React.useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  let temp = [];
  let timespan = 90;
  let current = new Date();
  current.setDate(current.getDate() - timespan);
  let date;
  let month = "";
  let days = "";
  if (current.getMonth() < 9) {
    month = "0" + (current.getMonth() + 1);
  } else {
    month = current.getMonth() + 1;
  }
  if (current.getDate() < 10) {
    days = "0" + current.getDate();
  } else {
    days = current.getDate();
  }
  let year = current.getFullYear() + "";
  date = `${days}-${month}-${year}`;
  temp = allSales.filter(
    (item) =>
      item.date.split("-").reverse().join("") >
      date.split("-").reverse().join("")
  );

  const [showMore, setShowMore] = React.useState(false);
  const [comp, setcomp] = React.useState("PSA");
  const psaSales = temp.filter((item) => item.company === "PSA");
  const cgcSales = temp.filter((item) => item.company === "CGC");
  const bgsSales = temp.filter((item) => item.company === "BGS");


  const calculateAverage = (company, grade) => {
    let total = 0.0;
    let average = 0.0;
    let arr = [];
    if (company === "PSA")
      arr = psaSales.filter((item) => +item.grade === grade);
    else if (company === "CGC")
      arr = cgcSales.filter((item) => +item.grade === grade);
    else if (company === "BGS")
      arr = bgsSales.filter((item) => +item.grade === grade);

    if (arr.length < 1) {
      return "- - - - -";
    }
    for (var i = 0; i < arr.length; i++) {
      total = total + arr[i].sold;
    }
    average = total / arr.length;
    return "$" + average.toFixed(2);
  };

  const calculateMinimum = (company, grade) => {
    let arr = [];
    if (company === "PSA")
      arr = psaSales.filter((item) => +item.grade === grade);
    else if (company === "CGC")
      arr = cgcSales.filter((item) => +item.grade === grade);
    else if (company === "BGS")
      arr = bgsSales.filter((item) => +item.grade === grade);
    if (arr.length < 1) {
      return "- - - - -";
    }

    arr.sort(function (a, b) {
      return a.sold - b.sold;
    });
    return "$" + arr[0].sold.toFixed(2);
  };

  const calculateMedian = (company, grade) => {
    let arr = [];
    let median = 0.0;
    if (company === "PSA")
      arr = psaSales.filter((item) => +item.grade === grade);
    else if (company === "CGC")
      arr = cgcSales.filter((item) => +item.grade === grade);
    else if (company === "BGS")
      arr = bgsSales.filter((item) => +item.grade === grade);
    if (arr.length < 1) {
      return "- - - - -";
    }
    // console.log(arr);
    const mid = Math.floor(arr.length / 2);
    let nums = [...arr].sort((a, b) => a.sold - b.sold);
    // console.log(nums);
    // console.log(mid);
    if (mid < 1) return "$" + nums[0].sold.toFixed(2);
    if (arr.length % 2 !== 0) median = nums[mid].sold;
    else {
      median = (nums[mid - 1].sold + nums[mid].sold) / 2;
    }
    // console.log(median);
    return "$" + median.toFixed(2);
  };

  const calculateHigh = (company, grade) => {
    let arr = [];
    if (company === "PSA")
      arr = psaSales.filter((item) => +item.grade === grade);
    else if (company === "CGC")
      arr = cgcSales.filter((item) => +item.grade === grade);
    else if (company === "BGS")
      arr = bgsSales.filter((item) => +item.grade === grade);
    if (arr.length < 1) {
      return "- - - - -";
    }
    arr.sort(function (a, b) {
      return b.sold - a.sold;
    });
    // console.log(arr);
    return "$" + arr[0].sold.toFixed(2);
  };

  const snapshotGrade = (company, grade) => {
    return (
      <>
        <p className="snapshot__heading">{company + " " + grade}</p>
        <p className="snapshot__average">{calculateAverage(company, grade)}</p>
        <p className="snapshot__minimum">{calculateMinimum(company, grade)}</p>
        <p className="snapshot__median">{calculateMedian(company, grade)}</p>
        <p className="snapshot__high">{calculateHigh(company, grade)}</p>
      </>
    );
  };

  const snapshotScroll = () => {
    const grades = [];
    let limit;
    if (showMore) {
      limit = 1;
    } else {
      limit = 9;
    }
    for (var i = 10; i >= limit; i = i - 0.5) {
      grades.push(i);
    }
    // console.log(grades);
    return (
      <>
        {grades.map((item) => {
          // console.log(item);
          return (
            <>
              <div className="snapshot__row">
                <div className="snapshot__psa">
                  {snapshotGrade("PSA", item)}
                </div>
                <div className="snapshot__psa">
                  {snapshotGrade("CGC", item)}
                </div>
                <div className="snapshot__psa">
                  {snapshotGrade("BGS", item)}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const snapScroll = (company) => {
    const grades = [];
    let limit = 1;
    for (var i = 10; i >= limit; i = i - 0.5) {
      grades.push(i);
    }
    return (
      <>
        {grades.map((item) => {
          return (
            <>
              <div className="media_mobile_snapshot_row_container">
                <div className="media_mobile_snapshot_row">
                  {snapshotGrade(company, item)}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };



  const theme = {
    transparent: {
      default: "#08131F",
      hover: "#102235",
    },
    teal: {
      default: "#106f6b",
      hover: "#179992",
    },
  };
  const MobileButton = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    outline: none;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    margin: 5px;
    border-radius: 10px;
    color: white;
    width: 28%;
    padding: 5px 0px;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    &:hover {
      background-color: ${(props) => theme[props.theme].hover};
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;
  const Button = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    outline: none;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    margin: 5px;
    border-radius: 10px;
    color: white;
    width: 60px;
    padding: 5px 0px;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    &:hover {
      background-color: ${(props) => theme[props.theme].hover};
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;
  const CompToggle = styled(MobileButton)`
    opacity: 1;
    ${({ active }) => active && `opacity: 0.5;`}
  `;
  const compRange = ["PSA", "BGS", "CGC"];
  const ToggleButtons = (props) => {
    return (
      <div className="media_mobile_snapshot_buttons">
        {props.type.map((type) =>
        (<CompToggle
          theme={props.theme}
          active={!(comp === type)}
          onClick={(e) => {
            setcomp(type);
          }}
        >
          {type}
        </CompToggle>
        ))}
      </div>
    );
  };

  return (
    <div className="snapshot">
      <h4>90 Days Price Summary</h4>
      {(windowDimensions && windowDimensions.width && windowDimensions.width > 960) ?
        <><div className="snapshot__container">
          <div className="psa__snapshot">
            <p className="snapshot__heading">Grade</p>
            <p className="snapshot__heading">Average</p>
            <p className="snapshot__heading">Minimum</p>
            <p className="snapshot__heading">Median</p>
            <p className="snapshot__heading">High</p>
          </div>
          <div className="cgc__snapshot">
            <p className="snapshot__heading">Grade</p>
            <p className="snapshot__heading">Average</p>
            <p className="snapshot__heading">Minimum</p>
            <p className="snapshot__heading">Median</p>
            <p className="snapshot__heading">High</p>
          </div>
          <div className="bgs__snapshot">
            <p className="snapshot__heading">Grade</p>
            <p className="snapshot__heading">Average</p>
            <p className="snapshot__heading">Minimum</p>
            <p className="snapshot__heading">Median</p>
            <p className="snapshot__heading">High</p>
          </div>
        </div>
          <div className="snapshot_scroll_wrapper">{snapshotScroll()}</div>
          {showMore ? (
            <div
              className="snapshot__showMore"
              onClick={(e) => {
                setShowMore(false);
                window.scrollTo(0, 550);
              }}
            >
              Show Less Information
            </div>
          ) : (
            <div
              className="snapshot__showMore"
              onClick={() => {
                setShowMore(true);
                window.scrollTo(0, 550);
              }}
            >
              Show More Information
            </div>
          )}</>
        :
        <>
          <div >
            <ToggleButtons type={compRange} default={0} theme="teal" />
          </div>
          <div className="media_mobile_snapshot_all">
            <div className="media_mobile_snapshot_container snapshotscrollPSA">
              <div className="media_mobile_snapshot">
                <p className="media_mobile_snapshot_heading">Grade</p>
                <p className="media_mobile_snapshot_heading">Average</p>
                <p className="media_mobile_snapshot_heading">Minimum</p>
                <p className="media_mobile_snapshot_heading">Median</p>
                <p className="media_mobile_snapshot_heading">High</p>
              </div>
              <div className="media_mobile_snapshot_scroll">
                {(comp === "PSA") ? snapScroll("PSA") : (comp === "BGS") ? snapScroll("BGS") : snapScroll("CGC")}
              </div>
            </div>
            {/* <div className="media_mobile_snapshot_container snapshotscrollBGS" id="snapshotscrollBGS">
              <div className="media_mobile_snapshot">
                <p className="media_mobile_snapshot_heading">Grade</p>
                <p className="media_mobile_snapshot_heading">Average</p>
                <p className="media_mobile_snapshot_heading">Minimum</p>
                <p className="media_mobile_snapshot_heading">Median</p>
                <p className="media_mobile_snapshot_heading">High</p>
              </div>
              <div className="media_mobile_snapshot_scroll">{snapScroll("BGS")}</div>
            </div>
            <div className="media_mobile_snapshot_container" id="snapshotscrollCGC">
              <div className="media_mobile_snapshot">
                <p className="media_mobile_snapshot_heading">Grade</p>
                <p className="media_mobile_snapshot_heading">Average</p>
                <p className="media_mobile_snapshot_heading">Minimum</p>
                <p className="media_mobile_snapshot_heading">Median</p>
                <p className="media_mobile_snapshot_heading">High</p>
              </div>
              <div className="media_mobile_snapshot_scroll">{snapScroll("CGC")}</div>
            </div> */}
          </div>
        </>
      }
    </div>
  );
}

export default Snapshot;
