import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Loader from "react-loader-spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Offer = () => {
  const params = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${params.id}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [params.id]);

  return isLoading ? (
    <Loader
      className="home-loader"
      type="Puff"
      color="#2CB1BA"
      height={80}
      width={80}
    />
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div style={{ width: 500, marginTop: 30 }}>
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
          >
            {data.product_pictures.map((elem, index) => {
              return (
                <div key={elem.asset_id}>
                  <img
                    style={{
                      height: 800,
                      objectFit: "cover",
                      backgroundColor: "white",
                    }}
                    src={elem.secure_url}
                    alt={data.product_name}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            height: 300,
            padding: 40,
            margin: "30px 0 0 50px",
          }}
        >
          <span>{data.product_price} €</span>

          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            return (
              <div key={index}>
                <span>{keys[0]}</span>
                <span>{elem[keys[0]]}</span>
              </div>
            );
          })}

          <span>{data.product_name}</span>
          <span>{data.product_description}</span>
          <div
            onClick={() => alert("Go to user profile !")}
            className="offer-avatar-username"
          >
            <img
              alt={data.product_name}
              src={data.owner.account.avatar.secure_url}
            />
            <span>{data.owner.account.username}</span>
          </div>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Offer;
