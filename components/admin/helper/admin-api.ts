import { apiCall } from "../../backend";

//category calls
export const createCategory = (userId: string, category: string) => {
  return apiCall('post', `/category/create/${userId}`, category)
};

export const getCategories = () => {
  return apiCall('get', '/categories');
};

export const deleteCategory = (categoryId: string, userId: string) => {
  return apiCall('delete', `/category/${categoryId}/${userId}`)
}

//products calls
export const createProduct = (userId: string, product: FormData) => {
  return apiCall('post', `/product/create/${userId}`, product, true);
};

export const getProducts = () => {
  return apiCall('get', '/products');
};

export const deleteProduct = (productId: string, userId: string ) => {
  return apiCall('delete', `/product/${productId}/${userId}`);
};

export const getProduct = (productId: string) => {
  return apiCall('get', `product/${productId}`);
};

export const updateProduct = (productId: string, userId: string, product: FormData) => {
  return apiCall('put', `/product/${productId}/${userId}`, product, true);
};
