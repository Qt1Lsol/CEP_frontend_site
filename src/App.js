import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";


import Header from "./components/Header/header";

import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Question from "./containers/Question/Question";
import QuestionView from "./containers/Question/QuestionView";
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

  const setAuthor = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  console.log(token)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `https://lereacteur-vinted-api.herokuapp.com/offers?priceMin=${fetchRangeValues[0]
  //       }&priceMax=${fetchRangeValues[1]}&sort=${sortPrice ? "price-desc" : "price-asc"
  //       }&title=${search}`
  //     );
  //     setData(response.data);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, [fetchRangeValues, sortPrice, search]);
  return (
    <Router>
      <Header
        // setUser={setUser}
        setAuthor={setAuthor}
        token={token}
        setFetchRangeValues={setFetchRangeValues}
        fetchRangeValues={fetchRangeValues}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home data={data} isLoading={isLoading} />} />
        <Route path="/signup" element={<Signup setAuthor={setAuthor} />} />
        <Route path="/login" element={<Login setAuthor={setAuthor} />} />
        <Route path="/question" element={<Question token={token} />} />
        <Route path="/question/view" element={<QuestionView token={token} setAuthor={setAuthor}  />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
