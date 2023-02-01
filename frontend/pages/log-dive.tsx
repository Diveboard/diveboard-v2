import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { LogDiveBlock } from '../src/components/PageBlocks/LogADiveBlocks';

import { LogDiveProvider } from '../src/components/PageBlocks/LogADiveBlocks/LogDiveData/LogDiveProvider';
import pageRoutes from '../src/routes/pagesRoutes.json';
import { firestorePublicProfileService } from '../src/firebase/firestore/firestoreServices/firestorePublicProfileService';
import 'react-toastify/dist/ReactToastify.css';

const LogDive: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <LogDiveProvider>
        <ToastContainer />
        <LogDiveBlock userId={user.uid} />
      </LogDiveProvider>
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

  if (!uid) {
    return {
      redirect: {
        destination: pageRoutes.authPageRout,
        permanent: false,
      },
    };
  }

  const user = await firestorePublicProfileService.getUserById(uid);

  return {
    props: {
      user,
    },
  };
};
export default LogDive;
