import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo_couleur_en_poche.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import PriceRange from "../PriceRange";
import Cookies from "js-cookie";

import "./header.css";

const Header = ({
  token,
  setToken,
  setAuthor,
  setFetchRangeValues,
  sortPrice,
  setSortPrice,
  setSearch,
}) => {
  // const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div className="header-container">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="header-logo" src={logo} alt="Culture En Poche" />
      </div>

      {token ? (
        <div className="tab-button-container">
          <div className="tab-container">
            <button
              onClick={() => {
                navigate("/question");
              }}
              className="button-tab"
            >
              <FontAwesomeIcon icon="search" className="search-input-icon" />
              Poster une question
            </button>

            <button
              onClick={() => {
                navigate("/tuto");
              }}
              className="button-tab"
            >
              <FontAwesomeIcon icon="search" className="search-input-icon" />
              Tuto
            </button>

            <button
              onClick={() => {
                navigate("/question/view");
              }}
              className="button-tab"
            >
              <FontAwesomeIcon icon="search" className="search-input-icon" />
              Mes questions
            </button>

            <button
              onClick={() => {
                navigate("/profil");
              }}
              className="button-tab"
            >
              <FontAwesomeIcon icon="search" className="search-input-icon" />
              Profil
            </button>

            <button
              onClick={() => {
                setToken(null);
                Cookies.remove("token");

                navigate("/login");
              }}
              className="button-tab"
            >
              <FontAwesomeIcon icon="search" className="search-input-icon" />
              Se déconnecter
            </button>
          </div>
        </div>
      ) : (
        <div className="tab-container">
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="header-button button-login-signup button-signup"
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="header-button button-login-signup"
          >
            Se connecter
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
