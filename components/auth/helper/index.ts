import { AuthJWT } from 'components/types';
import { apiCall } from '../../backend';
import { AuthPayload } from './types';

export const signup = (user: AuthPayload) => {
  return apiCall('post', '/signup', user)
};

export const signin = (user: Omit<AuthPayload, 'name'>) => {
  return apiCall('post', '/signin', user)
};

export const signout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');

    return apiCall('get', '/signout');
  }
};

export const authenticate = (data: AuthJWT, next: () => void) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const useAutheticate = (): AuthJWT => {
  if (typeof window === 'undefined') {
    return {token: '', user: null};
  }
  if (localStorage.getItem('jwt'))
    return JSON.parse(localStorage.getItem('jwt'));
  return {token: '', user: null};
};
