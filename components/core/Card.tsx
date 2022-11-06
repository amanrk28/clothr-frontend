import React from 'react';
import { ImageHelper } from './helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import { Product } from 'components/types';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

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
  reload = undefined,
}: CartProps) => {
  const router = useRouter();
  const cartTitle = product ? product.name : 'A photo from pexels';
  const cartDescrption = product ? product.description : 'Default description';
  const cartPrice = product ? product.price : 'DEFAULT';

  const addToCart = () => {
    addItemToCart(product, () => {
      toast.success('Added product to cart!')
      router.push('/cart');
    });
  };

  return (
    <div className={`text-white w-[300px] h-[380px] flex flex-col items-center shadow-lg ${addtoCart ? 'shadow-green-500/60' : ''} ${removeFromCart ? 'shadow-gray-500/60' : ''}`}>
      <div className="w-full h-full flex flex-col items-center">
        <ImageHelper image={product?.photo || ''} />
        <h1 className="text-xl font-semibold pt-8">{cartTitle}</h1>
        <p className="w-full p-2 font-weight-normal truncate text-center">
          {cartDescrption}
        </p>
        <p className="btn px-4 font-semibold text-xl ">&#8377; {cartPrice}</p>
      </div>

      <div className="w-full">
        {addtoCart ? (
          <button className="btn-grad-success w-full py-2 font-medium rounded-b"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )
          : null}
        {removeFromCart ? (
          <button className="btn-grad-danger w-full py-2 font-medium rounded-b" onClick={() => {
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
