export const API = process.env.NEXT_PUBLIC_BACKEND;

export type Method =
  | 'get'
  | 'delete'
  | 'post'
  | 'put'

export const apiCall = async (method: Method, url: string, data={}, isFormData = false) => {
  let userToken = '';
  if (typeof window !== 'undefined') {
    const jwt = localStorage.getItem('jwt');
    if (jwt)
      userToken = JSON.parse(jwt).token;
  }
  let headers: Record<string, unknown> = {};
  if (!isFormData) {
    headers = {
      'Content-Type': 'application/json',
    };
  }
  if (userToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${userToken}`,
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
