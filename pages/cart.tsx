import { NextPage } from 'next';
import React from 'react';
import Cart from 'components/core/Cart';
import { PageHead } from 'components/core/PageHead';

const CartPage: NextPage = () => {
    return (
        <>
            <PageHead title="Shooping Cart" description="Your shopping cart" />
            <Cart />
        </>
    )
}

export default CartPage
