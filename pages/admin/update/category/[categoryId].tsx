import { NextPage } from 'next';
import React from 'react';
import UpdateCategory from 'components/admin/UpdateCategory';
import { PageHead } from 'components/core/PageHead';

const UpdateCategoryPage: NextPage = () => {
    return (
        <>
            <PageHead title="Update category name" description="" />
            <UpdateCategory />
        </>
    )
}

export default UpdateCategoryPage;
