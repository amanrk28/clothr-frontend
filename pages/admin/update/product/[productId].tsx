import { NextPage } from 'next';
import React from 'react';
import UpdateProduct from 'components/admin/UpdateProduct';
import { PageHead } from 'components/core/PageHead';

const UpdateProductPage: NextPage = () => {
    return (
        <>
            <PageHead title="Update product details" description="" />
            <UpdateProduct />
        </>
    )
}

export default UpdateProductPage;
