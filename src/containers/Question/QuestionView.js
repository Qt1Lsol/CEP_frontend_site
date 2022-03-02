import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";


import "./QuestionView.css";

const QuestionView = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {

  try {

    const fetchData = async () => {
      const response = await axios.get(
        `https://cepbackend.herokuapp.com/question/view`);

      setData(response.data);
      setIsLoading(false);

    };

    fetchData();

  }catch(error){

    console.log(error.message);
  };

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

    <ul>
      {data.map((index) => {
        return <li key={index}><span>Firstname :</span><span>{data._id}</span></li>;
      })}
    </ul>

  );
};

export default QuestionView;
