import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../../src/layouts/MainLayout';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { firebaseAdmin } from '../../src/firebase/firebaseAdmin';
import pageRoutes from '../../src/routes/pagesRoutes.json';

const HomeUser: InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
      <div style={{
        height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      >
        USER
      </div>
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.diveBoardUserId;

  if (!uid) {
    return {
      redirect: {
        destination: pageRoutes.mainPageGuest,
        permanent: false,
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

export default HomeUser;
