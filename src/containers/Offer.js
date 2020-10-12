import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Loader from "react-loader-spinner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
    <div>
      <Slider {...settings}>
        <img src={data.product_image.secure_url} />
        {data.product_pictures.map((elem, index) => {
          return <img src={elem.secure_url} alt={data.product_name} />;
        })}
      </Slider>
    </div>
  );
};

export default Offer;
