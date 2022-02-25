import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

import "./Question.css";

const Question = ({ token }) => {

    const [questionText, setQuestionText] = useState("blabla");
    const [description, setDescription] = useState("description");
    const [latitude, setLatitude] = useState("123");
    const [longitude, setLongitude] = useState("456");
    const [linkWiki, setLinkWiki] = useState("wiki");
    const [linkPlace, setLinkPlace] = useState("place");

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const fromPublish = location.state?.fromPublish ? true : null;

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            // const formData = new FormData();
            // formData.append("questionText", questionText);
            // formData.append("description", description);
            // formData.append("latitude", latitude);
            // formData.append("longitude", longitude);
            // formData.append("linkWiki", linkWiki);
            // formData.append("linkPlace", linkPlace);

            const response = await axios.post(
                "https://cepbackend.herokuapp.com/question/publish",

                {
                    questionText: questionText,
                    description: description,
                }


                // formData
                // {
                //     headers: {
                //         Authorization: "Bearer " + token,
                //         "Content-Type": "multipart/form-data",
                //     },
                // }
            );

            if (response.data._id) {
                // redirectoin vers l'offre
                navigate(`/question`);
            } else {
                alert("Une erreur est survenue, veuillez réssayer");
            }

        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                setErrorMessage("An error occured");
            }

        }
    };

    return (
        <div className="question-container">
            <div className="separation"></div>
            <div className="question-form">
                <form onSubmit={handleSubmit} >
                    <div className="bloc-form">
                        <span>Poser votre question</span>
                        <input
                            onChange={(event) => {
                                setQuestionText(event.target.value);
                            }}
                            placeholder="votre question"
                            type="text"
                        />
                    </div>
                    <div className="bloc-form">
                        <span>Description de votre question</span>
                        <input
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                            placeholder="il s'agit ... "
                            type="text"
                        />
                    </div>
                    <div className="bloc-form">
                        <span>Coordonnées GPS : Latitude () || Longitude ()</span>
                        <div className="bloc-gps">
                            <div>
                                <input
                                    onChange={(event) => {
                                        setLatitude(event.target.value);
                                    }}
                                    placeholder="latitude ()"
                                    type="text"
                                />
                            </div>
                            <div className="separation"></div>
                            <div>
                                <input
                                    onChange={(event) => {
                                        setLongitude(event.target.value);
                                    }}
                                    placeholder="longitude ()"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bloc-form">
                        <span>Lien url vers le site du wiki correspondant</span>
                        <input
                            onChange={(event) => {
                                setLinkWiki(event.target.value);
                            }}
                            placeholder="url"
                            type="text"
                        />
                    </div>
                    <div className="bloc-form">
                        <span>Lien url du point d'intéret</span>
                        <input
                            onChange={(event) => {
                                setLinkPlace(event.target.value);
                            }}
                            placeholder="url"
                            type="text"
                        />
                    </div>

                    <span className="signup-login-error-message">{errorMessage}</span>

                    <button className="button-submit" type="submit">
                        Publier la question
                    </button>

                </form>
            </div>
            <div className="separation"></div>

        </div>
    );
};

export default Question;