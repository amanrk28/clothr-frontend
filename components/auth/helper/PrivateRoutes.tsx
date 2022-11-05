import React from 'react';
import { useRouter } from 'next/router';
import { isAutheticated } from './index';

const PrivateRoute = ({ component: Component }) => {
  const router = useRouter();
  const isAuth = isAutheticated();
  if (!isAuth) router.push('/');
  return <Component />
};

export default PrivateRoute;
