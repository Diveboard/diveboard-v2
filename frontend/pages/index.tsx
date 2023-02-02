import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import Guest from '../src/components/PageBlocks/HomePageBlocks/Guest';

const Home:
InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout isFilled>
      <ToastContainer />
      <Guest />
    </MainLayout>
  </AuthLayout>
);

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  if (uid) {
    return {
      redirect: {
        destination: `/logbook/${uid}`,
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
