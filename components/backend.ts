import { isAutheticated } from "./auth/helper";

export const API = process.env.NEXT_PUBLIC_BACKEND;

export type Method =
  | 'get'
  | 'delete'
  | 'post'
  | 'put'

export const apiCall = async (method: Method, url: string, data={}, isFormData: boolean = false) => {
    const {token} = isAutheticated();
    let headers: any = {};
    if (!isFormData) {
      headers = {
        'Content-Type': 'application/json',
      }
    }
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    const options: any = {
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
}