import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import SmallCard from "../../components/SmallCard";
import "./styles.css";

const Checkout = () => {
  const params = useParams();
  const history = useHistory();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${params.id}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/payment",
      state: { productName: data.product_name, totalPrice: total },
    });
  };

  const price = data.product_price;
  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  return isLoading ? (
    <Loader
      className="home-loader"
      type="Puff"
      color="#2CB1BA"
      height={80}
      width={80}
    />
  ) : (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <div className="row flex-gap">
          <div className="column flex-gap primary ">
            {/* COMMANDE */}
            <div className="checkout-card order">
              <div className="title">Commande</div>
              <div className="content">
                <SmallCard data={data} />
              </div>
            </div>

            {/* ADRESSE */}
            <div className="checkout-card address">
              <div className="title">Adresse</div>
              <div className="content clickable">
                Ajoute ton adresse
                <span className="plus">+</span>
              </div>
            </div>

            {/* PAIEMENT */}
            <div className="checkout-card payment">
              <div className="title">Paiement</div>
              <div className="content clickable">
                Ajoute une méthode de paiement
                <span className="plus">+</span>
              </div>
            </div>

            {/* MODE D'ENVOI */}
            <div className="checkout-card delivery">
              <div className="title">Mode d'envoi</div>
              <div className="content disabled ">
                Choisis un mode d'envoi
                <span className="plus">+</span>
                <span className="alert">
                  Merci de choisir un mode de paiement et d'ajouter une adresse
                  d'abord
                </span>
              </div>
            </div>
          </div>

          <div className="column side">
            {/* RESUME DE LA COMMANDE */}
            <div className="checkout-card summary">
              <div className="title">Résumé de la commande</div>
              <div className="content">
                <ul>
                  <li>
                    Commande <span>{price} €</span>
                  </li>
                  <li>
                    Frais protection acheteurs <span>{protectionFees} €</span>
                  </li>
                  <li>
                    Frais de port <span>{shippingFees} €</span>
                  </li>
                </ul>
              </div>
              <div className="divider" />
              <div className="content">
                <ul>
                  <li className="bold">
                    Total <span>{total} €</span>
                  </li>
                </ul>
                <button className="enabled" onClick={onSubmit}>
                  Payer maintenant
                </button>
                <span className="info">Ce paiement est crypté et sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
