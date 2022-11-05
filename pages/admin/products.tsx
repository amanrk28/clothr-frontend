import { NextPage } from 'next';
import React from 'react';
import ManageProducts from 'components/admin/ManageProducts';
import { PageHead } from 'components/core/PageHead';

const ManageProductsPage: NextPage = () => {
    return (
        <>
            <PageHead title="Manage Products" description="" />
            <ManageProducts />
        </>
    )
}

export default ManageProductsPage
