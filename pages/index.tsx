import { NextPage } from 'next';
import React from 'react';
import Home from 'components/core/Home';
import { PageHead } from 'components/core/PageHead';

const HomePage: NextPage = () => {
    return (
        <>
            <PageHead title="Online T-Shirt Store" description="Buy T-Shirts" />
            <Home />
        </>
    )
}

export default HomePage
