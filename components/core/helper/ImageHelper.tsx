import React from "react";
import { Product } from "components/types";
import { API } from "../../backend";

export const ImageHelper = ({ product }: {product: Product}) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

  return (
    <img
      src={imageurl}
      alt="photo"
      className="rounded-t"
      style={{ width: '100%', maxHeight: "100%", maxWidth: "100%" }}
    />
  );
};

