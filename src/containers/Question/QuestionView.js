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
        console.log(index);
        return (
        <li key={index}>

          {/* <span>{index}</span> */}

          <span>Question:</span>
          <span>{data[0].questionText}</span>

            <figure>
              <figcaption>{data[0].questionText}</figcaption>
              <audio
                controls
                src={data[0].questionAudio.secure_url}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </figure>

          <span>Description :</span>
          <span>{data[0].description}</span>

          <img src={data[0].questionPicture.secure_url} alt="pré-visualisation" />

          <span>Coordonnées :</span>
          <span>{data[0].latitude}</span>
          <span>{data[0].longitude}</span>
          <span>Lien wiki :</span>
          <span>{data[0].LinkWiki}</span>
          <span>Lien du lieu :</span>
          <span>{data[0].LinkPlace}</span>
          <span>id :</span>
          <span>{data[1]._id}</span>
          <span>{data[0]._id.getTimestamp}</span>
          
        </li>
      )})}
    </ul>

  );
};

export default QuestionView;
