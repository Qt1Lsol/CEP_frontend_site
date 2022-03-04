import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Profil.css";

const Profil = ({ token }) => {

    //useState("") pour éditer un input
    const [editEmail, setEditEmail] = useState("disabled");
    const [editPassword, setEditPassword] = useState("disabled");
    const [editEntityType, setEditEntityType] = useState("disabled");
    const [editBusinessName, setEditBusinessName] = useState("disabled");
    const [editNaf, setEditNaf] = useState("disabled");

    //style inline 
    const [siBackgroudColorInput, setSiBackgroudColorInput] = useState(false); 




    //useState("") pour formulaire
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [entityType, setEntityType] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [naf, setNaf] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const fromPublish = location.state?.fromPublish ? true : null;

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("entityType", entityType);
            formData.append("businessName", businessName);
            formData.append("naf", naf);

            const response = await axios.post(
                "https://cepbackend.herokuapp.com/question/publish",
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
            } else {
                alert("Une erreur est survenue, veuillez réssayer");
            }

        } catch (error) {
            setErrorMessage("An error occured");
        }
    };

    return (
        <div className="question-container">
            <div className="separation"></div>
            <div className="question-form">
                <form onSubmit={handleSubmit} >
                    <div className="bloc-form">
                        <span>Email</span>
                        <input
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            placeholder="email"
                            type="text"
                            value ="test"
                            disabled={editEmail}
                            style={{ backgroudColor: siBackgroudColorInput ? "red" : "blue"}}
                        />

                        <button 
                            onClick={() => {
                            if (editEmail===""){
                            setEditEmail("disabled");
                            setSiBackgroudColorInput(false)
                            }else{
                            setEditEmail("");
                            setSiBackgroudColorInput(true)
                            }

                            }}
                            className="button-tab"
                            >
                            <FontAwesomeIcon icon="search" className="search-input-icon" />
                            Edit
                        </button>

                    </div>
                    <div className="bloc-form">
                        <span>Mot de passe</span>
                        <input
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            placeholder="password"
                            type="password"
                            value ="test"
                            disabled={editPassword}
                        />

                        <button
                            onClick={() => {
                            if (editPassword===""){
                            setEditPassword("disabled");
                            }else{
                            setEditPassword("");
                            }

                            }}
                            className="button-tab"
                            >
                            <FontAwesomeIcon icon="search" className="search-input-icon" />
                            Edit
                        </button>

                    </div>

                    <div className="bloc-form">
                        <span>Type d'entité</span>

                        <select disabled={editEntityType} onChange={(event)=>{
                             setEntityType(event.target.value);
                        }} >

                            <option value="select">Selectionez :</option>
                            <option value="association">Association</option>
                            <option value="company">Entreprise</option>
                            <option value="touristOffice">Office de tourisme</option>
                            <option value="academic">Scolaire</option>
                        </select>

                          <button
                            onClick={() => {
                            if (editEntityType===""){
                            setEditEntityType("disabled");
                            }else{
                            setEditEntityType("");
                            }

                            }}
                            className="button-tab"
                            >
                            <FontAwesomeIcon icon="search" className="search-input-icon" />
                            Edit
                        </button>

                    </div>
                    <div className="bloc-form">
                        <span>Raison sociale</span>
                        <input
                            onChange={(event) => {
                                setBusinessName(event.target.value);
                            }}
                            placeholder="raison sociale"
                            type="text"
                            value ="test"
                            disabled={editBusinessName}
                        />

                        <button
                            onClick={() => {
                            if (editBusinessName===""){
                            setEditBusinessName("disabled");
                            }else{
                            setEditBusinessName("");
                            }

                            }}
                            className="button-tab"
                            >
                            <FontAwesomeIcon icon="search" className="search-input-icon" />
                            Edit
                        </button>
                    </div>

                    <div className="bloc-form">
                        <span>Code NAF</span>
                        <input
                            onChange={(event) => {
                                setNaf(event.target.value);
                            }}
                            placeholder="code naf"
                            type="text"
                            value ="test"
                            disabled={editNaf}
                        />

                        <button
                            onClick={() => {
                            if (editNaf===""){
                            setEditNaf("disabled");
                            }else{
                            setEditNaf("");
                            }

                            }}
                            className="button-tab"
                            >
                            <FontAwesomeIcon icon="search" className="search-input-icon" />
                            Edit
                        </button>

                    </div>

                    <span className="signup-login-error-message">{errorMessage}</span>

                    <button className="button-submit" type="submit">
                        Valider votre profil
                    </button>

                </form>
            </div>
            <div className="separation"></div>

        </div>
    );
};

export default Profil;
