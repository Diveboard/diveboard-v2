import React from 'react';
import { NextPage } from 'next';
import { SignInBlock } from '../src/components/PageBlocks/SignInBlock';
import { AuthLayout } from '../src/layouts/AuthLayout';

const Auth: NextPage = () => (
  <AuthLayout>
    <SignInBlock />
  </AuthLayout>
);

export default Auth;
