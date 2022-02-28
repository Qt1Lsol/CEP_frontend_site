import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

import "./index.css";

const Login = ({ setAuthor }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const fromPublish = location.state?.fromPublish ? true : null;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        "https://cepbackend.herokuapp.com/author/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setAuthor(response.data.token);
        setIsLoading(false);
        navigate(fromPublish ? "/question" : "/question");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.1");
      }
    } catch (error) {

      if (error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
        setIsLoading(false);
      }

      console.log(error.message);
    };
  };

  return (
    <div className="signup-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          placeholder="Adresse email"
          type="email"
        />
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Mot de passe"
          type="password"
        />
        <span className="signup-login-error-message">{errorMessage}</span>
        {isLoading ? (
          <Loader type="Puff" color="#2CB1BA" height={40} width={40} />
        ) : (
          <button disabled={isLoading ? true : false} type="submit">
            Se connecter
          </button>
        )}
      </form>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
    </div>
  );
};

export default Login;
