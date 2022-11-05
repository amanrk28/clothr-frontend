import { apiCall } from 'components/backend';

export const createOrder = (userId: string, orderData: Record<string, unknown>) => {
  return apiCall('post', `/order/create/${userId}`, { order: orderData });
};
