import { Product } from "components/types";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="flex flex-col justify-center items-center md:flex-row md:items-start">
        <div className="flex flex-wrap justify-center items-start w-1/2 p-4">
          {products?.length > 0 ? (
            <div>
              <h2 className="text-center text-lg font-medium">Your Products</h2>
              {products.map((product, index) => (
                <div key={index} className="p-6">
                  <Card
                    product={product}
                    removeFromCart={true}
                    addtoCart={false}
                    setReload={setReload}
                    reload={reload}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <h1 className="text-4xl py-8">No products in cart</h1>
              <p className="mt-4 text-2xl">
                Go to <Link href="/" className="underline hover:text-blue-500">store</Link>
              </p>
            </>
          )}
        </div>
        {products?.length > 0 ? (
          <div className="flex flex-wrap justify-center items-start w-1/2 p-4">
            <h2 className="text-center text-lg font-medium">Checkout</h2>
          </div>
        ) : null}
      </div>
    </Base>
  );
};

export default Cart;
