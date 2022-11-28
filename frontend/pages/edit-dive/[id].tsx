import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { firebaseAdmin } from '../../src/firebase/firebaseAdmin';
import { MainLayout } from '../../src/layouts/MainLayout';
import { AuthLayout } from '../../src/layouts/AuthLayout';
import { LogDiveBlock } from '../../src/components/PageBlocks/LogADiveBlocks';
import { LogDiveProvider } from '../../src/components/PageBlocks/LogADiveBlocks/LogDiveData/LogDiveProvider';
import pageRoutes from '../../src/routes/pagesRoutes.json';
import { firestoreDivesService } from '../../src/firebase/firestore/firestoreServices/firestoreDivesService';

const Dive: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  user,
  dive,
  diveId,
}) => (
  <AuthLayout user={user}>
    <MainLayout>
      <LogDiveProvider>
        <LogDiveBlock diveId={diveId} dive={dive} userId={user.uid} />
      </LogDiveProvider>
    </MainLayout>
  </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.req.cookies.__session;
  const diveId = context.query?.id;

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

  if (!diveId) {
    return {
      redirect: {
        // TODO: not Found page
        destination: pageRoutes.mainPageGuest,
        permanent: false,
      },
    };
  }

  const dive = await firestoreDivesService.getDiveData(uid, diveId as string);

  if (!dive) {
    return {
      redirect: {
        // TODO: not Found page
        destination: pageRoutes.mainPageGuest,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        uid,
        email,
        photoURL,
        name: displayName,
      },
      diveId,
      dive: JSON.parse(JSON.stringify(dive)),
    },
  };
};
export default Dive;
