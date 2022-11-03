import React from "react";
import { ImageHelper } from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Product } from 'components/types';
import { useRouter } from "next/router";

interface CartProps {
  product: Product;
  addtoCart?: boolean;
  removeFromCart?: boolean;
  setReload?: (x) => void;
  reload?: boolean;
}

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  reload = undefined
}: CartProps) => {
  const router = useRouter();
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => {
      router.push('/cart');
    });
  };

  return (
    <div className="text-white w-[280px] h-[360px] flex flex-col items-center border-2 rounded">
      <div className="w-full h-full flex flex-col items-center">
        <ImageHelper product={product} />
        <h1 className="text-2xl font-bold py-2">{cartTitle}</h1>
        <p className="w-full p-2 font-weight-normal truncate">
          {cartDescrption}
        </p>
        <p className="btn px-4 font-semibold text-xl ">&#8377; {cartPrice}</p>
      </div>

      <div className="w-full">
        {addtoCart ? (
          <button className="bg-green-600 w-full py-2 font-medium"
            onClick={addToCart}
          >
            <div>
              Add to Cart
            </div>
          </button>
        )
          : null}
        {removeFromCart ? (
          <button className="bg-green-600 w-full py-2 font-medium" onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          >
            <div>
              Remove from cart
            </div>
          </button>
        )
          : null}
      </div>
    </div>
  );
};

export default Card;
