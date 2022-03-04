import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import tear from "../../assets/images/tear.svg";
import Loader from "react-loader-spinner";

import googlePlay from "../../assets/images/googlePlay.png"

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>

          <div>
            Tu vuex jouer à Culture En Poche ? Télécharge l'app sur le Play Store :
            <img className="header-logo" src={googlePlay} alt="Play Store" />
          </div>

          <h1>Culture En Poche</h1>

          <h2>Vous etes curieux ?</h2>

          <p>
            Cette application mobile est faite pour vous (ou pour vos enfants) !

            Lors d'un parcours à pied ou en transport, elle vous fera découvrir le monde qui vous entour en jouant.

            Regardez devant vous, que voyez vous ? 

            <ul>
              <li>Un magnifique paysage montagneux</li>
              <li>Une rivière</li>
              <li>Une foret</li> 
              <li>La mer</li>  
            </ul>

            Vous aimeriez en avoir plus, c'est possible !     
            
          </p>

        <h2>On vous explique tout</h2>

          <p>
            Culture En Poche va vous poser des questions tout au long de votre parcours. 
            Mais attention, pas des questions aléatoires comme durant une partie de trivial poursuite ! 
            Elle va vous poser des questions sur votre environnement immédiat ! 

            Elle sera force de proposition en vous indicant des lieux à visiter. 
            Elle veillera sur vous car oui, elle vous proposera de faire des pauses régulière durant votre aventure. 
            Et encore une fois, ca ne sera pas une simple pause ! Elle s'éfforcera de vous proposer des aventures toujours plus exeptionnelles les unes que les autres. 
            Vous visiterez, voyagerez, découvrirez des endrois insolites, vous apprendrez et comprendrez le monde qui vous entoure. 
          </p>

          <h2>Participez à l'aventure</h2>
          <p>
            Vous souhaitez créer vos questions, n'hésitez pas à nous contacter. 
          </p>

          <p>
            Expliquer le concept général
            Qu'est ce qu'il doivent faire ?
            Ceq ue j'attend d'eux ? 
            Comment ca fonctionne
            Quel est leur intérét ? 
            LEs QuestionSchema
            Quel style de question ?
            Les moyens mient a votre disposition
            VIdeo tuto. 
          </p>

    </div>
  );
};

export default Home;
