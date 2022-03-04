import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Question.css";

const Question = ({ token }) => {

    const [questionText, setQuestionText] = useState("blabla");
    const [description, setDescription] = useState("description");
    const [latitude, setLatitude] = useState(123);
    const [longitude, setLongitude] = useState(456);
    const [linkWiki, setLinkWiki] = useState("wiki");
    const [linkPlace, setLinkPlace] = useState("place");

    //image de la question
    const [questionPicture, setQuestionPicture] = useState({});
    const [preview, setPreview] = useState("");

    //image de la question
    const [questionAudio, setQuestionAudio] = useState({});
    const [previewAudio, setPreviewAudio] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const fromPublish = location.state?.fromPublish ? true : null;

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const formData = new FormData();
            formData.append("questionText", questionText);
            formData.append("description", description);
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);
            formData.append("linkWiki", linkWiki);
            formData.append("linkPlace", linkPlace);
            formData.append("questionPicture", questionPicture);
            formData.append("questionAudio", questionAudio);

            const response = await axios.post(
                // "https://cepbackend.herokuapp.com/question/publish",
                "http://localhost:4000/question/publish",
                formData,

                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            if (response.data._id) {
                // redirectoin vers question pour ne saisir un autre
                navigate("/question");
                console.log("réponse requete==>", response.data._id);
            } else {
                alert("Une erreur est survenue, veuillez réssayer");
            }

        } catch (error) {
            setErrorMessage("An error occured");
            console.log("catch question ==>", error.response);
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

                        {/* gestion de l'audio */}

                               <div className="bloc-form">
                        {previewAudio ? (
                            
                            <div className="dashed-preview-audio">

                                    <figure>
                                        <figcaption>{questionText}</figcaption>
                                        <audio
                                            controls
                                            src={previewAudio}>
                                                Your browser does not support the
                                                <code>audio</code> element.
                                        </audio>
                                    </figure>

                                    <div
                                                className="remove-img-button"
                                                onClick={() => {
                                                    setPreviewAudio("");
                                                }}
                                            >
                                                X
                                            </div>
                            </div>
                        ) : (
                            <div className="dashed-preview-without">
                            <div className="input-design-default">
                                <label htmlFor="fileAudio" className="label-file">
                                    <span className="input-sign">+</span>
                                    <span>Ajoute une bande son</span>
                                </label>
                                <input
                                    id="fileAudio"
                                    type="file"
                                    className="input-file"
                                    onChange={(event) => {
                                        setQuestionAudio(event.target.files[0]);
                                        setPreviewAudio(URL.createObjectURL(event.target.files[0]));
                                    }}
                                />
                            </div>
                        </div>
                        )}
                    </div>

                    {/* gestion de l'image */}

                    <div className="file-select">
                        {preview ? (
                            <div className="dashed-preview-image">
                                <img src={preview} alt="pré-visualisation" />
                                <div
                                    className="remove-img-button"
                                    onClick={() => {
                                        setPreview("");
                                    }}
                                >
                                    X
                                </div>
                            </div>
                        ) : (
                            <div className="dashed-preview-without">
                                <div className="input-design-default">
                                    <label htmlFor="filePicture" className="label-file">
                                        <span className="input-sign">+</span>
                                        <span>Ajoute une photo</span>
                                    </label>
                                    <input
                                        id="filePicture"
                                        type="file"
                                        className="input-file"
                                        onChange={(event) => {
                                            setQuestionPicture(event.target.files[0]);
                                            setPreview(URL.createObjectURL(event.target.files[0]));
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bloc-form">
                        <span>Coordonnées GPS : Latitude (48.85838145257094) || Longitude (2.2945592741673058)</span> 
                        <div className="bloc-gps">
                            <div>
                                <input
                                    onChange={(event) => {
                                        setLatitude(event.target.value);
                                    }}
                                    placeholder="latitude (48.85838145257094)"
                                    type="text"
                                />
                            </div>
                            <div className="separation"></div>
                            <div>
                                <input
                                    onChange={(event) => {
                                        setLongitude(event.target.value);
                                    }}
                                    placeholder="longitude (2.2945592741673058)"
                                    type="text"
                                />
                            </div>
                            
                            <a  href={'https://www.google.fr/maps/dir//' + latitude + ',' + longitude} target="_blank"  class="button">Vérifier les coordonnées sur la carte</a>
                            
                        </div>
                    </div>

                    <div className="bloc-form">
                        <span>Page web vers le site du wiki correspondant</span>
                        <input
                            onChange={(event) => {
                                setLinkWiki(event.target.value);
                            }}
                            placeholder="page web"
                            type="text"
                        />
                    </div>
                    <div className="bloc-form">
                        <span>Page web du point d'intéret</span>
                        <input
                            onChange={(event) => {
                                setLinkPlace(event.target.value);
                            }}
                            placeholder="page web"
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
