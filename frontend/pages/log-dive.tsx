import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { LogDiveBlock } from '../src/components/PageBlocks/LogADiveBlocks';
import { LogDiveProvider } from '../src/components/PageBlocks/LogADiveBlocks/LogDiveData/LogDiveProvider';
import pageRoutes from '../src/routes/pagesRoutes.json';

const LogDive: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <LogDiveProvider>
        <LogDiveBlock />
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

  const {
    email,
    photoURL = '',
    displayName = '',
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
export default LogDive;
