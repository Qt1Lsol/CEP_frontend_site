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
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [params.id]);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return isLoading ? (
    <Loader
      className="home-loader"
      type="Puff"
      color="#2CB1BA"
      height={80}
      width={80}
    />
  ) : (
    <div style={{ width: 500 }}>
      <Carousel showThumbs={false} showStatus={false} showIndicators={false}>
        {data.product_pictures.map((elem, index) => {
          return (
            <div>
              <img
                style={{
                  height: 800,
                  objectFit: "contain",
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
  );
};

export default Offer;
