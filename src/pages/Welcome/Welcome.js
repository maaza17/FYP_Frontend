import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Welcome.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Button } from "../../components/Button/Button";

const Welcome = (props) => {
  const code = useHistory().location.pathname.split("/")[2];
  // const [error, setError] = React.useState(false);
  // const [id, setId] = React.useState(new URLSearchParams(confirm).get("id"));
  // const code = new URLSearchParams(confirm);
  console.log(props.match);
  if (props.match.path === "/confirm/:confirmationCode") {
    console.log(code);
    const VerifyUser = (code) => {
      console.log(code);
      return axios
        .get(
          "" + process.env.REACT_APP_BACKEND_URL + "api/user/verifyuser/" + code
        )
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    };
    VerifyUser(code);
  }

  return (
    <>
      <Navbar />
      <div className="welcome">
        <div className="welcome_navspace"></div>
        <div className="welcome_content">
          <div className="welcome_confirmation">
            Account confirmed!
          </div>
        </div>
        <div className="welcome-hero-btns">
          <Button
            to="/login"
            className="welcome-btns"
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
          >
            Please Login <i class="fas fa-long-arrow-alt-right"></i>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
