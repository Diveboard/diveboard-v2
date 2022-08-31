import React from 'react';
import { NextPage } from 'next';
import { SignInBlock } from '../src/components/PageBlocks/SignInBlock';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';

const Auth: NextPage = () => (
  <AuthLayout>
    <MainLayout>
      <SignInBlock />
    </MainLayout>
  </AuthLayout>
);

export default Auth;
