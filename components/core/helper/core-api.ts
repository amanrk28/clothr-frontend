import { apiCall } from '../../backend';

export const getProducts = () => {
  return apiCall('get', '/products');
};
