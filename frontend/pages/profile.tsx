import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ProfileBlock } from '../src/components/PageBlocks/ProfileBlocks';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { MainLayout } from '../src/layouts/MainLayout';
import pageRoutes from '../src/routes/pagesRoutes.json';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';

const Profile:InferGetServerSidePropsType<typeof getServerSideProps> = ({ user }) => (
  <AuthLayout user={user}>
    <MainLayout>
      <ProfileBlock />
    </MainLayout>
  </AuthLayout>

);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;

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

export default Profile;
