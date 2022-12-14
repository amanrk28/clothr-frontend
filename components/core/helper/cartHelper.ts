import { Product } from 'components/types';

export const addItemToCart = (item: Product, next: () => void) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
      ...item,
      count: 1,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
};

export const removeItemFromCart = (productId: string) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const cartEmpty = (next: () => void) => {
  if (typeof window !== undefined) {
    localStorage.removeItem('cart');
    const cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};
