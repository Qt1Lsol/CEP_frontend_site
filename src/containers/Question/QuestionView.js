import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionCard from "../../components/QuestionCard";

import "./QuestionView.css";

const QuestionView = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          // `https://cepbackend.herokuapp.com/question/view?search=${search}`
          `http://localhost:4000/question/view?search=${search}`
        );

        setData(response.data);
        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [search]);

  return isLoading ? (
    <Loader
      className="home-loader"
      type="Puff"
      color="#2CB1BA"
      height={80}
      width={80}
    />
  ) : (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des questions"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {data.map((question) => {
        return <QuestionCard key={question._id} question={question} />;
      })}
    </div>
  );
};

export default QuestionView;
