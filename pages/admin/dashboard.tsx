import { NextPage } from 'next';
import React from 'react';
import AdminDashBoard from 'components/user/AdminDashBoard';
import { PageHead } from 'components/core/PageHead';

const AdminDashBoardPage: NextPage = () => {
    return (
        <>
            <PageHead title="Your Account" description="" />
            <AdminDashBoard />
        </>
    )
}

export default AdminDashBoardPage
