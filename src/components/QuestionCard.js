import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  return (
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

              <div className="question-card-middle">
              {/* <div>{question.questionPicture.secure_url ? <h1>{question.questionPicture.secure_url}</h1> : <h1>Pas de titre</h1>}</div> */}
              {/* <span>{question.questionPicture.secure_url}</span>
              <span>{question.questionAudio.secure_url}</span> */}
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

                <span>{question.createdAt}</span>
                <span>{question.updatedAt}</span>

              </div>

              <div className="question-card-right">

                  <button 
                    onClick={() => {}}
                    className="button-tab"
                  >
                  <FontAwesomeIcon icon="search" className="search-input-icon" />
                  Modifier
                  </button>

                  <button 
                    onClick={() => {}}
                    className="button-tab"
                  >
                  <FontAwesomeIcon icon="search" className="search-input-icon" />
                  Supprimer
                  </button>
                
              </div>

            </div>
  );
};

export default QuestionCard;
