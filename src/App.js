import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Header from "./components/Header";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Offer from "./containers/Offer";
import Payment from "./containers/Payment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCheck, faRedo } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faCheck, faRedo);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);
  const [search, setSearch] = useState("");

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?priceMin=${
          fetchRangeValues[0]
        }&priceMax=${fetchRangeValues[1]}&sort=${
          sortPrice ? "price-desc" : "price-asc"
        }&title=${search}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchRangeValues, sortPrice, search]);
  return (
    <Router>
      <Header
        setUser={setUser}
        token={token}
        setFetchRangeValues={setFetchRangeValues}
        fetchRangeValues={fetchRangeValues}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        setSearch={setSearch}
      />
      <Switch>
        <Route exact path="/">
          <Home data={data} isLoading={isLoading} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
