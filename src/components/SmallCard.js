import React from "react";

const SmallCard = ({ data }) => {
  // Show list of details
  const detailsList = (details) => {
    const result = [];
    details.map((detail) => result.push(Object.values(detail).join()));
    return result.join(" · ");
  };

  return (
    <div className="product">
      <img alt={data.product_name} src={data.product_image.secure_url} />
      <div>
        {data.product_name}
        <div className="description">{detailsList(data.product_details)}</div>
      </div>
      <div className="price">{data.product_price} €</div>
    </div>
  );
};

export default SmallCard;
