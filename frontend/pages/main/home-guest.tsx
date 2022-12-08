import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { MainLayout } from '../../src/layouts/MainLayout';
import Guest from '../../src/components/PageBlocks/HomePageBlocks/Guest';

const HomeGuest:
InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
      <Guest />
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (uid) {
    return {
      redirect: {
        destination: '/logbook',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: null,
    },
  };
};

export default HomeGuest;
