import { isAutheticated } from './auth/helper';

export const API = process.env.NEXT_PUBLIC_BACKEND;

export type Method =
  | 'get'
  | 'delete'
  | 'post'
  | 'put'

export const apiCall = async (method: Method, url: string, data={}, isFormData = false) => {
  const {token} = isAutheticated();
  let headers: Record<string, unknown> = {};
  if (!isFormData) {
    headers = {
      'Content-Type': 'application/json',
    };
  }
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  const options: Record<string, unknown> = {
    method,
    headers,
  };
  if (method !== 'get' && !isFormData) {
    options.body = JSON.stringify(data);
  }
  if (isFormData) {
    options.body = data;
  }
  const res = await fetch(API + url, options);
  return await res.json();
};
