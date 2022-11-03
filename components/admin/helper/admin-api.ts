import { API, apiCall } from "../../backend";

//category calls
export const createCategory = (userId, category) => {
  return apiCall('post', `/category/create/${userId}`, category)
};

//get all categories
export const getCategories = () => {
  return apiCall('get', '/categories');
};

//products calls
//create a product
export const createProduct = (userId, product) => {
  return apiCall('post', `/product/create/${userId}`, product, true);
};

//get all products
export const getProducts = () => {
  return apiCall('get', '/products');
};

//delete a product

export const deleteProduct = (productId, userId) => {
  return apiCall('delete', `/product/${productId}/${userId}`);
};

//get a product

export const getProduct = productId => {
  return apiCall('get', `product/${productId}`);
};

//update a product

export const updateProduct = (productId, userId, product) => {
  return apiCall('put', `/product/${productId}/${userId}`, product, true);
};
