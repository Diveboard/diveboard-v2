import React from 'react';
import { NextPage } from 'next';
import { MainDonateBlock } from '../src/components/PageBlocks/DonateBlocks/MainDonateBlock';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';

const Donate : InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
      <MainDonateBlock />
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

export default Donate;
