import { NextPage } from 'next';
import React from 'react';
import PrivateRoute from 'components/auth/helper/PrivateRoutes';
import UserDashBoard from 'components/user/UserDashBoard';

const UserDashBoardPage: NextPage = () => {
    return <PrivateRoute component={UserDashBoard} />
}

export default UserDashBoardPage;
