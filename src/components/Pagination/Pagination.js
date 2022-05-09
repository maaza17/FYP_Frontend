import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "../../pages/Shop/Shop.css";
import { blueGrey } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const ColorButton = withStyles((theme) => ({
  root: {
    marginLeft: 3,
    marginRight: 3,
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: blueGrey[700],
    },
  },
}))(Button);

const Pagination = ({ cardsPerPage, totalcards, paginate, currentPage }) => {
  const [TempPage, setTempPage] = useState(currentPage);
  const [PageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(Math.floor((currentPage - 1) / PageNumberLimit) * PageNumberLimit);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(Math.ceil((currentPage) / PageNumberLimit) * PageNumberLimit);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalcards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePrevbtn = (number) => {
    callPaginate(number - 1);
    if ((number - 1) % PageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - PageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - PageNumberLimit);
    }
  };
  const handleNextbtn = (number) => {
    callPaginate(number + 1);
    if (number + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + PageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + PageNumberLimit);
    }
  };
  const handleIncrease = () => {
    setmaxPageNumberLimit(maxPageNumberLimit + PageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit + PageNumberLimit);
    setTempPage(TempPage + 5);
  };
  const handleDecrease = () => {
    setmaxPageNumberLimit(maxPageNumberLimit - PageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit - PageNumberLimit);
    setTempPage(TempPage - 5);
  };
  const handleFirstJump = (number) => {
    setmaxPageNumberLimit(number + 4);
    setminPageNumberLimit(number - 1);
    callPaginate(number);
  };
  const handleLastJump = (number) => {
    setmaxPageNumberLimit(number);
    setminPageNumberLimit(number - (pageNumbers.length % PageNumberLimit));
    callPaginate(number);
  };
  // const handleRandomJump = () => {
  // let number = 20
  // let low = Math.floor((number-1)/PageNumberLimit)*PageNumberLimit;
  // let high = Math.ceil((number)/PageNumberLimit)*PageNumberLimit;
  //     // setmaxPageNumberLimit(number);
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  // console.log(low)
  // console.log(high)
  // setminPageNumberLimit();
  // callPaginate(number);
  // };
  const callPaginate = (number) => {
    setTempPage(number);
    paginate(number);
  };
  let firstButton = null;
  if (TempPage >= 6) {
    firstButton = (
      <ColorButton
        color="primary"
        variant="contained"
        onClick={() => handleFirstJump(pageNumbers[0])}
      >
        {pageNumbers[0]}
      </ColorButton>
    );
  }

  let lastButton = null;
  if (TempPage < (pageNumbers.length - (pageNumbers.length % PageNumberLimit))) {
    lastButton = (
      <ColorButton
        color="primary"
        variant="contained"
        onClick={() => handleLastJump(pageNumbers[pageNumbers.length - 1])}
      >
        {pageNumbers[pageNumbers.length - 1]}
      </ColorButton>
    );
  }

  let pageIncrementBtn = null;
  if (pageNumbers.length - 1 > maxPageNumberLimit) {
    pageIncrementBtn = (
      <ColorButton
        disabled={
          TempPage === pageNumbers[pageNumbers.length - 1] ? true : false
        }
        color="primary"
        variant="contained"
        onClick={() => handleIncrease()}
      >
        &hellip;
      </ColorButton>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <ColorButton
        color="primary"
        variant="contained"
        onClick={() => handleDecrease()}
      >
        &hellip;
      </ColorButton>
    );
  }
  const RenderPag = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <ColorButton
          color="primary"
          variant={currentPage === number ? "outlined" : "contained"}
          onClick={() => callPaginate(number)}
        >
          {number}
        </ColorButton>
      );
    } else {
      return null;
    }
  });
  if ((totalcards !== 0))
    return (
      <div>
        <div className="shop__page">
          <ColorButton
            disabled={currentPage === pageNumbers[0] ? true : false}
            color="primary"
            variant="contained"
            onClick={() => handlePrevbtn(currentPage)}
          >
            Previous
          </ColorButton>
          {firstButton}
          {pageDecrementBtn}
          {RenderPag}
          {pageIncrementBtn}
          {lastButton}
          <ColorButton
            disabled={
              currentPage === pageNumbers[pageNumbers.length - 1] ? true : false
            }
            color="primary"
            variant="contained"
            onClick={() => handleNextbtn(currentPage)}
          >
            Next
          </ColorButton>
        </div>
      </div>
    );
};

export default Pagination;
