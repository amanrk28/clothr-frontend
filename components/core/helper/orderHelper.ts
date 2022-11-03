import { apiCall } from "components/backend";

export const createOrder = (userId, orderData) => {
  return apiCall('post', `/order/create/${userId}`, { order: orderData });
};
