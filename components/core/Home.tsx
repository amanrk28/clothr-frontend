import { Product } from "components/types";
import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/core-api";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="flex flex-wrap justify-center">
        {[...products, ...products, ...products, ...products].map((product, index) => (
          <div key={index} className="p-6">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Base>
  );
}
