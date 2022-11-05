import { NextPage } from 'next';
import React from 'react';
import PrivateRoute from 'components/auth/helper/PrivateRoutes';
import UserDashBoard from 'components/user/UserDashBoard';
import { PageHead } from 'components/core/PageHead';

const UserDashBoardPage: NextPage = () => {
    return (
        <>
            <PageHead title="Your Account" description="" />
            <PrivateRoute component={UserDashBoard} />
        </>
    )
}

export default UserDashBoardPage;
