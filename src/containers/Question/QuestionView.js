import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import tear from "../../assets/images/tear.svg";
import Loader from "react-loader-spinner";


import "./QuestionView.css";

const QuestionView = ({}) => {


  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://cepbackend.herokuapp.com/question/view`);

      setData(response.data);
      setIsLoading(true);
    };

    fetchData();
  },[]);


  return isLoading ? (
    <Loader
      className="home-loader"
      type="Puff"
      color="#2CB1BA"
      height={80}
      width={80}
    />
  ) : (
    <>
      <div className="home-card-wrapper">
        {data.offers &&
          data.offers.map((card, index) => {
            return <Card key={index} data={card} />;
          })}
      </div>
    </>
  );
};

export default QuestionView;
