import React from "react";
import "./Error.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Error() {
  return (
    <>
      <Navbar />
      <div className="errorContainer">
        ERROR Loading Page
        <br />
        <br />
        Please check the URL and reload again
      </div>
      <Footer />
    </>
  );
}
