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

    <div>

    <ul>
      {data.map(question => {
        return (
          <li key={question._id}>
            <div key={question._id} className="question-card">
              <div key={question._id} className="question-card-left">
                  <span>Votre question :</span>
                  <span>{question.questionText}</span>

                  <span>Description :</span>
                  <span>{question.description}</span>

                  <span>Coordonnées GPS :</span>
                  <span>Latitude :</span><span>{question.latitude}</span>
                  <span>Longitude :</span><span>{question.longitude}</span>

                  <span>Page web vers le site du wiki correspondant :</span>
                  <span>{question.linkWiki}</span>

                  <span>Page web du point d'intéret :</span>
                  <span>{question.linkPlace}</span>

              </div>

              <div className="question-card-right">
              <span>{question.questionPicture.secure_url}</span>
              <span>{question.questionAudio.secure_url}</span>
                <figure>
                  <figcaption>Test</figcaption>
                  <audio
                      controls
                      src="">
                          Your browser does not support the
                          <code>audio</code> element.
                  </audio>
                </figure>

                <img src="" alt="image de la question" />

              </div>

            </div>
          </li>

        );
        
      })}
    </ul>

    </div>
  );
};

export default QuestionView;
