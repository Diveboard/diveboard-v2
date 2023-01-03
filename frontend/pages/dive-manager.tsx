import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MainLayout } from '../src/layouts/MainLayout';
import { AuthLayout } from '../src/layouts/AuthLayout';

import DiveManagerBlock from '../src/components/DiveManager';
import { firestoreDivesService } from '../src/firebase/firestore/firestoreServices/firestoreDivesService';
import pageRoutes from '../src/routes/pagesRoutes.json';
import { firestorePublicProfileService } from '../src/firebase/firestore/firestoreServices/firestorePublicProfileService';

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

  const user = await firestorePublicProfileService.getUserById(uid);

  if (!user) {
    return {
      redirect: {
        destination: pageRoutes.mainPageGuest,
        permanent: false,
      },
    };
  }

  const data = await firestoreDivesService.getDivesByUserId(uid);

  let dives = [];

  if (Array.isArray(data) && data.length !== 0) {
    dives = JSON.parse(JSON.stringify(data));
  }

  return {
    props: {
      user,
      dives,
    },
  };
};

export default DiveManager;
