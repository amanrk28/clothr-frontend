import { NextPage } from 'next';
import React from 'react';
import Signin from 'components/user/Signin';
import { PageHead } from 'components/core/PageHead';

const SigninPage: NextPage = () => {
    return (
        <>
            <PageHead title="Sign In" description="" />
            <Signin />
        </>
    )
}

export default SigninPage
