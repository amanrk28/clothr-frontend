import { NextPage } from 'next';
import React from 'react';
import AddProduct from 'components/admin/AddProduct';
import { PageHead } from 'components/core/PageHead';

const AddProductPage: NextPage = () => {
    return (
        <>
            <PageHead title="Create new product" description="" />
            <AddProduct />
        </>
    )
}

export default AddProductPage;
