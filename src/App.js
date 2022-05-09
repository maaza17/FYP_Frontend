import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Welcome from "./pages/Welcome/Welcome";
import Product from "./pages/Product/Product";
import Error from "./pages/Error/Error";
import Market from "./pages/Market/Market";
import MasterSetValue from "./pages/MasterSetValue/MasterSetValue";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import axios from "axios";
import Navbar from "./components/NavbarRest/NavbarRest";
import Favourite from "./pages/Favourite/Favourite";
import Market2 from "./pages/Maket2/Market2";
import MasterSetValue2 from "./pages/MasterSetValue2/MasterSetValue2";
require("dotenv").config();

function App() {
  // const [check, setCheck] = React.useState(false);
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post(
          ""+ process.env.REACT_APP_BACKEND_URL + "api/user/getprofile",
          {
            token: sessionStorage.getItem("token"),
          }
        )
        .then((res) => {
          if (res.data.success === true) {
            setUser(res.data.data);
          }
        });
    } else {
      setUser(null);
    }
  }, [sessionStorage.getItem("token")]);
 return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} user={user}/>
            <Route path="/login" component={Login} /> 
            <Route path="/signup" component={SignUp} />
            <Route path="/favourite" component={Favourite} user={user}/>
            <Route path="/search" component={Shop} user={user}/>
            <Route path="/product" component={Product} user={user}/>
            <Route path="/market">
              {user ? <Market /> : <Market2 />}
            </Route>
            {/* <Route path="/market" component={Market} /> */}
            <Route path="/setvalue">
              {user ? <MasterSetValue /> : <MasterSetValue2 />}
            </Route>
            {/* <Route path="/setvalue" component={MasterSetValue} user={user}/> */}
            <Route path="/confirm/:confirmationCode" component={Welcome} />
            <Route component={Error} />
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
