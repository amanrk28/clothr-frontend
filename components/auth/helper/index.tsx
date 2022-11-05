import { AuthJWT, EmptyAuthJWT } from 'components/types';
import { apiCall } from '../../backend';
import { AuthPayload } from './types';

export const signup = (user: AuthPayload) => {
  return apiCall('post', '/signup', user)
};

export const signin = (user: Omit<AuthPayload, 'name'>) => {
  return apiCall('post', '/signin', user)
};

export const signout = (next: () => void) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();

    return apiCall('get', '/signout');
  }
};

export const authenticate = (data: AuthJWT, next: () => void) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const isAutheticated = (): AuthJWT => {
  if (typeof window === 'undefined') {
    return EmptyAuthJWT;
  }
  if (localStorage.getItem('jwt'))
    return JSON.parse(localStorage.getItem('jwt'));
  return EmptyAuthJWT;
};
