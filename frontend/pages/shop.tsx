import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';

const Shop: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
      Shop
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.diveBoardUserId;

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
export default Shop;
