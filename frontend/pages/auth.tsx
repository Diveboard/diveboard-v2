import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { SignInBlock } from '../src/components/PageBlocks/SignInBlock';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';

const Auth: NextPage = () => (
  <AuthLayout>
    <MainLayout>
      <SignInBlock />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (!uid) {
    return {
      props: {
        user: null,
      },
    };
  }

  const {
    email, photoURL = '', displayName = '',
  } = await firebaseAdmin.auth().getUser(uid);

  return {
    props: {
      user: {
        uid,
        email,
        photoURL,
        name: displayName,
      },
    },
  };
};

export default Auth;
