import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';
import { firebaseAdmin } from '../src/firebase/firebaseAdmin';

import DiveManagerBlock from '../src/components/DiveManager';
import { firestoreDivesService } from '../src/firebase/firestore/firestoreServices/firestoreDivesService';
import pageRoutes from '../src/routes/pagesRoutes.json';

const DiveManager: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
  dives,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <DiveManagerBlock userId={user.uid} userDives={dives} />
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
    email,
    photoURL = '',
    displayName = '',
  } = await firebaseAdmin.auth().getUser(uid);

  const data = await firestoreDivesService.getDivesByUserId(uid);

  let dives = [];

  if (Array.isArray(data) && data.length !== 0) {
    dives = JSON.parse(JSON.stringify(data));
  }

  return {
    props: {
      user: {
        uid,
        email,
        photoURL,
        name: displayName,
      },
      dives,
    },
  };
};

export default DiveManager;
