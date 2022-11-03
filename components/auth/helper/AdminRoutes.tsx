import { useRouter } from "next/router";
import React from "react";
import { isAutheticated } from "./index";

const AdminRoute = ({ component: Component }) => {
  const router = useRouter();
  const isAuth = isAutheticated() && isAutheticated().user.role === 1;
  if (!isAuth) router.push('/signin');
  return <Component />
};

export default AdminRoute;
