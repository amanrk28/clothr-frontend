import { NextPage } from 'next';
import React from 'react';
import ManageCategories from 'components/admin/ManageCategories';
import { PageHead } from 'components/core/PageHead';

const ManageCategoriesPage: NextPage = () => {
    return (
        <>
            <PageHead title="Manage Categories" description="" />
            <ManageCategories />
        </>
    )
}

export default ManageCategoriesPage
