import { NextPage } from 'next';
import React from 'react';
import AddCategory from 'components/admin/AddCategory';
import { PageHead } from 'components/core/PageHead';

const AddCategoryPage: NextPage = () => {
    return (
        <>
            <PageHead title="Create new category" description="" />
            <AddCategory />
        </>
    )
}

export default AddCategoryPage
