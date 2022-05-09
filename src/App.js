import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Welcome from "./pages/Welcome/Welcome";
import Product from "./pages/Product/Product";
import Error from "./pages/Error/Error";
import MarketLoader from "./pages/MarketLoader/MarketLoader";
import MasterLoader from "./pages/MasterLoader/MasterLoader";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import axios from "axios";
import Navbar from "./components/NavbarRest/NavbarRest";
import Favourite from "./pages/Favourite/Favourite";
require("dotenv").config();

function App() {
  // const [check, setCheck] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [check, setCheck] = React.useState(true);
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoading(true);
      axios
        .post(
          "" + process.env.REACT_APP_BACKEND_URL + "api/user/getprofile",
          {
            token: sessionStorage.getItem("token"),

          }
        )
        .then((res) => {
          if (res.data.success === true) {
            setUser(res.data.data);
            setLoading(false);
          }
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [sessionStorage.getItem("token"), check]);
  return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/">
              <Home user={user} check={check}
                setCheck={(val) => {
                  setCheck(val);
                }} />
            </Route>
            <Route path="/login" >
              <Login check={check}
                setCheck={(val) => {
                  setCheck(val);
                }} />
            </Route>
            <Route path="/signup">
              <SignUp check={check}
                setCheck={(val) => {
                  setCheck(val);
                }} />
            </Route>
            <Route path="/favourite">
              <Favourite user={user} check={check}
                setCheck={(val) => {
                  setCheck(val);
                }} />
            </Route>
            <Route path="/search">
              <Shop user={user} check={check}
                setCheck={(val) => {
                  setCheck(val);
                }} />
            </Route>
            <Route path="/product">
              <Product user={user} check={check}
                setCheck={(val) => {
                  setCheck(val);
                }} />
            </Route>
            <Route path="/market">
              <MarketLoader user={user} loading={loading} check={check}
                setCheck={(val) => {
                  setCheck(val);
                }} />
            </Route>
            {/* <Route path="/MarketLoader" component={MarketLoader} /> */}
            <Route path="/setvalue" >
              <MasterLoader user={user} loading={loading} check={check}
                setCheck={(val) => {
                  setCheck(val);
                }} />
            </Route>
            {/* <Route path="/setvalue" component={MasterLoader} user={user}/> */}
            <Route path="/confirm/:confirmationCode" component={Welcome} />
            <Route component={Error} />
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
