import { NextPage } from 'next';
import React from 'react';
import Signup from 'components/user/Signup';
import { PageHead } from 'components/core/PageHead';


const SignupPage: NextPage = () => {
    return (
        <>
            <PageHead title="Registration" description="" />
            <Signup />
        </>
    )
}

export default SignupPage
