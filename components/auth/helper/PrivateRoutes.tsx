import React from 'react';
import { useRouter } from 'next/router';
import { useAutheticate } from './index';

const PrivateRoute = ({ component: Component }) => {
  const router = useRouter();
  const isAuth = useAutheticate();
  if (!isAuth) router.push('/');
  return <Component />
};

export default PrivateRoute;
